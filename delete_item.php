<?php

session_start();
include "connect.php";

$data = [];
$store = $_SESSION["store"] ?? "";
$branch = $_SESSION["branch"] ?? "";
$id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);

if ($store !== "" && $id) {
    if ($branch !== "") {
        $stmt = mysqli_prepare($conn, "DELETE FROM inventory WHERE id = ? AND store = ? AND branch = ?");
        mysqli_stmt_bind_param($stmt, "iss", $id, $store, $branch);
    } else {
        $stmt = mysqli_prepare($conn, "DELETE FROM inventory WHERE id = ? AND store = ?");
        mysqli_stmt_bind_param($stmt, "is", $id, $store);
    }
    $query = mysqli_stmt_execute($stmt);
    $affected = mysqli_stmt_affected_rows($stmt);
    mysqli_stmt_close($stmt);

    if ($query && $affected > 0) {
        $data = [
            "status" => "success"
        ];
    }
}

echo json_encode($data);
?>
