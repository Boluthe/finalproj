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

    $name= htmlentities($_POST["name"] ?? "");
    $quantity = filter_input(INPUT_POST, "quantity", FILTER_VALIDATE_INT);
    $supplier= htmlentities($_POST["supplier"] ?? "");
    $category = trim($_POST["category"] ?? "");
    $img_input = basename($_POST["img_input"] ?? "");
    $img_input = preg_replace("/[^A-Za-z0-9._-]/", "_", $img_input);
    if ($img_input === "") {
        $img_input = uniqid("product_", true) . ".bin";
    }

    $temp_img=$_FILES['image']['tmp_name'];
    if(!$dateTime){
        echo json_encode(['status'=>'invalid_date']);
        exit();
    }

    $date = $dateTime->format("Y-m-d");

    if($date < date("Y-m-d")){
        echo json_encode(['status'=>'past_date']);
    exit();
    }

    if (!$quantity || $quantity < 1 || $name === "" || $supplier === "" || $category === "") {
        echo json_encode(['status'=> 'quantity_invalid']);
        exit();
    }





    else{
        $query = false;
        if (!empty($store) && !empty($branch)) {
            mysqli_begin_transaction($conn);
            try {
                $stmt = mysqli_prepare(
                    $conn,
                    "INSERT INTO inventory (name, quantity, supplier, category, date, image, store, branch) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
                );
                mysqli_stmt_bind_param($stmt, "sissssss", $name, $quantity, $supplier, $category, $date, $img_input, $store, $branch);
                $query = mysqli_stmt_execute($stmt);
                mysqli_stmt_close($stmt);

                if (!$query) {
                    throw new Exception("inventory insert failed");
                }

                $purchase_stmt = mysqli_prepare(
                    $conn,
                    "INSERT INTO purchases(name, supplier, quantity, current_stock, date, store, branch) VALUES (?, ?, ?, ?, CURDATE(), ?, ?)"
                );
                mysqli_stmt_bind_param($purchase_stmt, "ssiiss", $name, $supplier, $quantity, $quantity, $store, $branch);
                $purchase_ok = mysqli_stmt_execute($purchase_stmt);
                mysqli_stmt_close($purchase_stmt);

                if (!$purchase_ok) {
                    throw new Exception("purchase insert failed");
                }

                mysqli_commit($conn);
            } catch (Throwable $e) {
                mysqli_rollback($conn);
                $query = false;
            }
        }

         if (!empty($temp_img)) {
            move_uploaded_file($temp_img, "./pictures/$img_input");
         }
         if($query){

            
           
          echo  json_encode(['status'=>'success']);
         }
    }


    

    

    
 
?>
