<?php

session_start();
include 'connect.php';
if(isset($_SESSION["id"])){
    $branch=$_SESSION["branch"];
    $store=$_SESSION["store"];
}

if(  !preg_match("/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/", $_POST["date"])){
    echo json_encode(['status'=>'invalid_date']);
    exit();
}




$dateTime = DateTime::createFromFormat("d/m/Y", $_POST["date"]);
      
    $name=htmlentities($_POST["name"]);
    $quantity=$_POST["quantity"];
    $id=$_POST["id"];
    $date=$dateTime->format("y-m-d");
    

    if($date<date("y-m-d")){
        echo json_encode(['status'=>'past_date']);
    exit();
    }

    if (!filter_var($quantity, FILTER_VALIDATE_INT)) {
        echo json_encode(['status'=> 'quantity_invalid']);
        exit();
    }





    else{
        $formatted_date = date("Y-m-d", strtotime($date));
        $query=mysqli_query($conn, "UPDATE inventory set name='$name', quantity='$quantity', date='$formatted_date' where id='$id'");
         if($query){



            
           
          echo  json_encode(['status'=>'success']);
         }
    }


    

    

    
 
?>