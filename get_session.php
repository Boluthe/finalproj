<?php
session_start();


include 'connect.php';
if(isset($_SESSION["id"])){
    echo json_encode([
        'status' => 'success',
        'email' => $_SESSION['email'],
        'name' => $_SESSION['name'],
        'store' => $_SESSION['store'],
        'branch' => $_SESSION['branch']
    ]);
  }

  else{
    echo json_encode(['status' => 'error']);
  }



?>