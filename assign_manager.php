<?php
session_start();
include "connect.php";
$store = $_SESSION["store"];

$data = ["status" => "error"];

$branch = $_POST["branch"];
$manager = $_POST["manager"];
$manager_name = $_POST["manager_name"];

// Check if the manager is already assigned to a branch
$check = mysqli_query($conn, "SELECT * FROM branches WHERE manager='$manager' AND store='$store'");
if (mysqli_num_rows($check) > 0) {
    $data = ["status" => "assigned"];
    echo json_encode($data);
    exit();
}

// Assign the manager to the branch
$query = mysqli_query($conn, "UPDATE branches SET manager='$manager', manager_name='$manager_name' WHERE branch='$branch' AND store='$store'");
if ($query) {
    $data = ["status" => "success"];
}

echo json_encode($data);
?>