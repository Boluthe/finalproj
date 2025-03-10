<?php
require 'connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $store_name = $_POST['store_name'];
    $store_address = $_POST['store_address'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Validate the input data
    if ($password !== $confirm_password) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Passwords do not match']);
        exit;
    }

    // Check if email already exists
    $email_check_query = "SELECT * FROM admin WHERE email='$email' LIMIT 1";
    $result = mysqli_query($conn, $email_check_query);
    if (mysqli_num_rows($result) > 0) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Email already in use']);
        exit;
    }

    // Check if store name already exists
    $store_check_query = "SELECT * FROM admin WHERE store_name='$store_name' LIMIT 1";
    $result = mysqli_query($conn, $store_check_query);
    if (mysqli_num_rows($result) > 0) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Store name already exists']);
        exit;
    }

    // Save the data to the database
    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $query = "INSERT INTO admin (name, email, phone, store_name, store_address, password) VALUES ('$name', '$email', '$phone', '$store_name', '$store_address', '$password_hash')";

    if (mysqli_query($conn, $query)) {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'success', 'message' => 'Admin account created successfully']);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['status' => 'error', 'message' => 'Failed to create account']);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
