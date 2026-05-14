<?php
include "connect.php";
session_start();

$response = "error";
$branch = $_SESSION["branch"] ?? "";
$store = $_SESSION["store"] ?? "";
$id = filter_input(INPUT_POST, "id", FILTER_VALIDATE_INT);
$quantity = filter_input(INPUT_POST, "quantity", FILTER_VALIDATE_INT);
$name = trim($_POST["name"] ?? "");
$customer = trim($_POST["customer"] ?? "");

if ($branch === "" || $store === "" || !$id || !$quantity || $quantity < 1 || $name === "" || $customer === "") {
    echo json_encode(["status" => $response]);
    exit();
}

mysqli_begin_transaction($conn);

try {
    $stock_stmt = mysqli_prepare($conn, "SELECT quantity FROM inventory WHERE id = ? AND branch = ? AND store = ? FOR UPDATE");
    mysqli_stmt_bind_param($stock_stmt, "iss", $id, $branch, $store);
    mysqli_stmt_execute($stock_stmt);
    $stock_result = mysqli_stmt_get_result($stock_stmt);
    $row = mysqli_fetch_assoc($stock_result);
    mysqli_stmt_close($stock_stmt);

    if (!$row) {
        mysqli_rollback($conn);
        echo json_encode(["status" => "error"]);
        exit();
    }

    $old_stock = (int)$row["quantity"];
    if ($old_stock < $quantity) {
        mysqli_rollback($conn);
        echo json_encode(["status" => "error"]);
        exit();
    }

    $current_stock = $old_stock - $quantity;

    $insert_stmt = mysqli_prepare(
        $conn,
        "INSERT INTO sales(name, quantity, customer, current_stock, date, branch, store) VALUES (?, ?, ?, ?, CURDATE(), ?, ?)"
    );
    mysqli_stmt_bind_param($insert_stmt, "sisiss", $name, $quantity, $customer, $current_stock, $branch, $store);
    $insert_ok = mysqli_stmt_execute($insert_stmt);
    mysqli_stmt_close($insert_stmt);

    if (!$insert_ok) {
        throw new Exception("insert failed");
    }

    $update_stmt = mysqli_prepare($conn, "UPDATE inventory SET quantity = ? WHERE id = ? AND branch = ? AND store = ?");
    mysqli_stmt_bind_param($update_stmt, "iiss", $current_stock, $id, $branch, $store);
    $update_ok = mysqli_stmt_execute($update_stmt);
    mysqli_stmt_close($update_stmt);

    if (!$update_ok) {
        throw new Exception("update failed");
    }

    mysqli_commit($conn);
    $response = "success";
} catch (Throwable $e) {
    mysqli_rollback($conn);
}

echo json_encode(["status" => $response]);
?>
