<?php

include 'connect.php';





$email = htmlspecialchars($_POST['email']);
$password = $_POST['password']; 





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

        $store=mysqli_query($conn, "SELECT * FROM branches WHERE manager='$email'");
      if($store_row=mysqli_fetch_assoc($store)){
        session_start();

        $_SESSION["id"]=$row["id"];
        $_SESSION["email"]=$row["email"];
        $_SESSION["name"]=$row["name"];
        $_SESSION["store"]=$row["store"];
        $_SESSION["branch"]=$store_row["branch"];
     
      
 

     

        echo json_encode([
            'status' => 'success',
            'redirect_url' => 'manager_dashboard.html'
        ]);
      }
      
      else if(!$store_row){
        echo json_encode(['status' => 'unnasigned']);
      }
      
      


       
  
    }
}



?>

<?php

// include 'connect.php';

// $email = htmlspecialchars($_POST['email']); // Sanitize email input
// $password = $_POST['password']; // Password is hashed, no need to escape here

// $query = "SELECT * FROM managers WHERE email = ?";
// $stmt = mysqli_stmt_init($conn);

// if (!mysqli_stmt_prepare($stmt, $query)) {
//     echo json_encode(['status' => 'error', 'message' => 'Database error']);
//     exit();
// }

// mysqli_stmt_bind_param($stmt, "s", $email);
// mysqli_stmt_execute($stmt);
// $result = mysqli_stmt_get_result($stmt);

// $row = mysqli_fetch_assoc($result);

// if (!$row) {
//     // No user found with the given email
//     echo json_encode(['status' => 'invalid_user']);
//     exit();
// }

// // Verify password
// $pwdHashed = $row["password"];
// $checkedpwd = password_verify($password, $pwdHashed);

// if (!$checkedpwd) {
//     echo json_encode(['status' => 'invalid_user']);
//     exit();
// }

// // Successful login
// session_start();

// $_SESSION["id"] = $row["id"];
// $_SESSION["email"] = $row["email"];
// $_SESSION["name"] = $row["name"];

// echo json_encode([
//     'status' => 'success',
//     'redirect_url' => 'manager_dashboard.html',
// ]);
?>
