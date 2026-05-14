<?php

session_start();
include 'connect.php';
if(isset($_SESSION["id"])){
    $branch=$_SESSION["branch"];
    $store=$_SESSION["store"];
}

if (!preg_match("/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/", $_POST["date"] ?? "")) {
    echo json_encode(['status'=>'invalid_date']);
    exit();
}




$dateTime = DateTime::createFromFormat("d/m/Y", $_POST["date"]);
$name = htmlentities($_POST["name"] ?? "");
$quantity = filter_input(INPUT_POST, "quantity", FILTER_VALIDATE_INT);
$id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);
$date = $dateTime ? $dateTime->format("Y-m-d") : "";

    if(!$dateTime){
        echo json_encode(['status'=>'invalid_date']);
        exit();
    }

    if($date < date("Y-m-d")){
        echo json_encode(['status'=>'past_date']);
    exit();
    }

    if (!$quantity || $quantity < 1 || !$id || $name === "") {
        echo json_encode(['status'=> 'quantity_invalid']);
        exit();
    }





    else{
        $store = $_SESSION["store"] ?? "";
        $query = false;
        if ($store !== "") {
            $stmt = mysqli_prepare($conn, "UPDATE inventory SET name = ?, quantity = ?, date = ? WHERE id = ? AND store = ?");
            mysqli_stmt_bind_param($stmt, "sisis", $name, $quantity, $date, $id, $store);
            $query = mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
        }
         if($query){



            
           
          echo  json_encode(['status'=>'success']);
         }
    }


    

    

    
 
?>
