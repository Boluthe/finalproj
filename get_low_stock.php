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


    while($row=mysqli_fetch_assoc($query)){
        $data[] = [
            "status" => "success",
            "branch" => $row["branch"],
            "name" => $row["name"],
            "quantity" => $row["quantity"],
            "supplier" => $row["supplier"],
            "id" => $row["id"],
            "image" => $row["image"],
            "date" => date("d/m/Y", strtotime($row["date"])),
        ];
    }



    echo json_encode($data);
?>