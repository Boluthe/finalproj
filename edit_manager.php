<?php

    session_start();
    
    include "connect.php";

    $data=[];

    if(isset($_GET["v"])){
        $id=$_GET["v"];
    }

    $name=$_POST["name"];
    $phone=$_POST["phone"];


    $query=mysqli_query($conn, "UPDATE managers set name='$name', phone='$phone' where id='$id'");
    
    if($query){
        $data=["status"=> "success"];
    }




    echo json_encode($data);
?>