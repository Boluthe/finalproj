<?php

    session_start();

    $store=$_SESSION["store"];

    include "connect.php";

    $data=[];

    $id=$_POST["id"];






    $query=mysqli_query($conn, "DELETE from inventory where id='$id'");

    if($query){
        $data=[
            "status"=>"success"
        ];

      
    }




    echo json_encode($data);
?>