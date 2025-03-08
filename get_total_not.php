<?php

    include "connect.php";

    session_start();


    $filters=[];

    $data=[];

    if(!empty($_SESSION["branch"])){
        $branch=$_SESSION["branch"];

        $filters[] = "branch = '$branch'";
    }


    $where="";


    if (count($filters) > 0) {
        $where = " AND " . implode(" AND ", $filters);
    }


    $store=$_SESSION["store"];


    $query=mysqli_query($conn, "SELECT * FROM inventory WHERE quantity<=100 and store='$store' $where");

    
    $query2=mysqli_query($conn, "SELECT * FROM inventory WHERE DATEDIFF(date, CURDATE())<= 7 and store='$store' $where");

    $num_row=mysqli_num_rows($query)+mysqli_num_rows($query2);

    $data=[
        "status"=>"success",
        "total"=>$num_row
    ];





    echo json_encode($data);
    ?>