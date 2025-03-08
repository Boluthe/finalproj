<?php

    session_start();

    $store=$_SESSION["store"];

    include "connect.php";

    $data=[];

    $id=$_POST["id"];
    $branch=$_POST["branch"];

    $check_query=mysqli_query($conn, "SELECT SUM(quantity) as total_quantity from inventory where branch='$branch' and store='$store' ");

    $row2=mysqli_fetch_assoc($check_query);
    $totalQuantity = $row2["total_quantity"];
    
    if($totalQuantity>0 or $totalQuantity!==null){
        $data=[
            "status"=>"in_stock"
        ];

        echo json_encode($data);
        exit();
    }



    $query=mysqli_query($conn, "DELETE from branches where id='$id'");

    if($query){
        $data=[
            "status"=>"success"
        ];

      
    }




    echo json_encode($data);
?>