<?php
session_start();
include 'connect.php';
if (isset($_SESSION["id"])) {
    $store = $_SESSION["store"];
}

$data = ["status" => "error"];
$branch = htmlentities($_POST["name"]);
$address = htmlentities($_POST["address"]);
$manager = isset($_POST["manager"]) ? htmlentities($_POST["manager"]) : null;

// Check if the branch already exists
if (mysqli_num_rows(mysqli_query($conn, "SELECT * FROM branches WHERE branch='$branch' AND store='$store'")) > 0) {
    $data = ["status" => "exists"];
    echo json_encode($data);
    exit();
}

// Create the new branch
$query = mysqli_query($conn, "INSERT INTO branches (branch, store, address, manager, manager_name) VALUES ('$branch', '$store', '$address', '$manager', '')");

if ($query) {
    $data = ["status" => "success"];
}

echo json_encode($data);
?>