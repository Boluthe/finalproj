<?php
// filepath: c:\xampp\htdocs\QuickTrack\create_admin.php

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
        echo json_encode(['status' => 'error', 'message' => 'Passwords do not match']);
        exit;
    }

    // Here you can add code to save the data to your database

    echo json_encode(['status' => 'success', 'message' => 'Admin account created successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
