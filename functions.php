<?php

include "connect.php";

function invalid_password($password){
    // Check if password contains at least one uppercase letter, one lowercase letter, and one special character
    if (!preg_match('/[A-Z]/', $password) || // Check for at least one uppercase letter
        !preg_match('/[a-z]/', $password) || // Check for at least one lowercase letter
        !preg_match('/[^a-zA-Z0-9]/', $password)) { // Check for at least one special character
        return true; // Password does not meet the criteria
    } else {
        return false; // Password meets the criteria
    }
}








function login($conn, $email, $password){


     
    $query="SELECT * FROM managers WHERE email=?";

    $stmt=mysqli_stmt_init($conn);

    if(!mysqli_stmt_prepare($stmt, $query)){
        // header("location: reg.php?error=stmtfailed");
        exit();
    }

    
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    $result= mysqli_stmt_get_result($stmt);

    $row=mysqli_fetch_assoc($result);
      
    


    if(!$row=mysqli_fetch_assoc($result)){
        echo json_encode(['status' => 'invalid_user']);
        exit();
    }
   

    else{
        $pwdHashed=$row["password"];
    
        $checkedpwd=password_verify($password, $pwdHashed);
    
        if($checkedpwd===false){
            echo json_encode(['status' => 'invalid_user']);
            exit();
        }
    
        else if($checkedpwd===true){
            session_start();
    
            $_SESSION["id"]=$row["id"];
            $_SESSION["email"]=$row["email"];
            $_SESSION["name"]=$row["name"];
         
          
     
    
         
    
            echo json_encode([
                'status' => 'success',
                'redirect_url' => 'manager_dashboard.html'
            ]);
            exit();
        }
    }
   

  

}
?>