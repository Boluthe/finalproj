<?php

    session_start();

    include "connect.php";

    $data=[];

    $id=$_POST["id"];
    $email=$_POST["email"];


    $query=mysqli_query($conn, "DELETE from managers where id='$id'");

    if($query){
        $data=[
            "status"=>"success"
        ];

        mysqli_query($conn, "UPDATE branches set manager='', manager_name='' where manager='$email'");
    }




    echo json_encode($data);
?>