<?php
session_start();
$store = $_SESSION["store"];
include "connect.php";

$data = [];

$id = $_POST["id"];
$branch = $_POST["branch"];

// Check if the branch has any inventory
$check_query = mysqli_query($conn, "SELECT SUM(quantity) as total_quantity FROM inventory WHERE branch='$branch' AND store='$store'");
$row2 = mysqli_fetch_assoc($check_query);
$totalQuantity = $row2["total_quantity"];

if ($totalQuantity > 0 || $totalQuantity !== null) {
    $data = ["status" => "in_stock"];
    echo json_encode($data);
    exit();
}

// Delete the branch
$query = mysqli_query($conn, "DELETE FROM branches WHERE id='$id'");
if ($query) {
    $data = ["status" => "success"];
}

echo json_encode($data);
?>