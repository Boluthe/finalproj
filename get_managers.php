<?php
include "connect.php";
session_start();
$store = $_SESSION["store"];

$query = mysqli_query($conn, "SELECT id, name FROM managers WHERE store='$store'");
$data = [];

if (mysqli_num_rows($query) < 1) {
    $data = ["status" => "null"];
} else {
    while ($row = mysqli_fetch_assoc($query)) {
        $data[] = [
            "id" => $row["id"],
            "name" => $row["name"]
        ];
    }
}

echo json_encode($data);
?>