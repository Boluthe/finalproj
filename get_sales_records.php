<?php

    include "connect.php";
    session_start();

    $store=$_SESSION["store"];

    $filters = [];

    if (!empty($_SESSION['branch'])) {
        $branch = $_SESSION['branch'];
        $filters[] = "branch = '$branch'";
    }


    if(isset($_GET["v"])){
        $v = $_GET['v'];
        $filters[] = "branch = '$v'";
    }




    $where = "";
    if (count($filters) > 0) {
        $where = " AND " . implode(" AND ", $filters);
    }

    $query=mysqli_query($conn, "SELECT * from sales where store='$store' $where order by id desc");
    $data=[];
  

    if(mysqli_num_rows($query)<1){
        $data=[
             "status"=>"no_record"  
            
            ];
    }

    else{
        while( $row=mysqli_fetch_assoc($query)){
            $data[]=[
                "branch"=>$row["branch"],
                "name"=>$row["name"],
                "quantity"=>$row["quantity"],
                "customer"=>$row["customer"],
                "current_stock"=>$row["current_stock"],
                "date"=>$row["date"]
            ];
        }
    
    }

   

    echo json_encode($data);
?>

