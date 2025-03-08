<?php

include 'connect.php';





$email = htmlspecialchars($_POST['email']);
$password = $_POST['password']; 





$query="SELECT * FROM admin WHERE email=?";

$stmt=mysqli_stmt_init($conn);

if(!mysqli_stmt_prepare($stmt, $query)){
    // header("location: reg.php?error=stmtfailed");
    exit();
}


mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$result= mysqli_stmt_get_result($stmt);

$row=mysqli_fetch_assoc($result);
  



if(!$row){
    echo json_encode(['status' => 'invalid_user']);
}


else{
    $pwdHashed=$row["password"];

    $checkedpwd=password_verify($password, $pwdHashed);

    if($checkedpwd===false){
        echo json_encode(['status' => 'invalid_user']);
 
    }

    else if($checkedpwd===true){
        session_start();

        $_SESSION["id"]=$row["id"];
        $_SESSION["email"]=$row["email"];
        $_SESSION["name"]=$row["name"];
        $_SESSION["store"]=$row["store"];
     
      
 

     

        echo json_encode([
            'status' => 'success',
            'redirect_url' => 'dashboard.html'
        ]);
  
    }
}



?>

