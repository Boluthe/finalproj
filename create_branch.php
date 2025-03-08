<?php

session_start();
include 'connect.php';
if(isset($_SESSION["id"])){
    $store=$_SESSION["store"];
}


$data=[
    "status"=>"error"
];
$branch=htmlentities($_POST["name"]);
$address=htmlentities($_POST["address"]);

if(mysqli_num_rows(mysqli_query($conn, "SELECT * from branches where branch='$branch' and store='$store'"))>0){
    $data=[
        "status"=>"exists"
    ];

    echo json_encode($data);
    exit();
}

$query=mysqli_query($conn, "INSERT into branches (branch, store, address) values
('$branch', '$store', '$address' )");


if($query){
    $data=["status"=>"success"];
}

echo json_encode($data);

?>