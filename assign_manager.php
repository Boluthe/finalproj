<?php

    session_start();
    include "connect.php";
    $store=$_SESSION["store"];

    $data=["status"=>"error"];

    $branch=$_POST["branch"];
    $manager=$_POST["manager"];
    $manager_name=$_POST["manager_name"];


    $check=mysqli_query($conn, "SELECT * from  branches where manager='$manager' and store='$store'");

    if(mysqli_num_rows($check)>0){
        $data=["status"=>"assigned"];
        echo json_encode($data);
        exit();
    }

    $query=mysqli_query($conn, "UPDATE branches set manager='$manager', manager_name='$manager_name' where branch='$branch' and store='$store'");


    if($query){
        $data=["status"=>"success"];
    }


    echo json_encode($data);

?>