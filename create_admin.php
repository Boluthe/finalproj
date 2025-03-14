<?php
require 'connect.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve and sanitize user inputs
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $store_name = htmlspecialchars(trim($_POST['store_name']));
    $store_address = htmlspecialchars(trim($_POST['store_address']));
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Validate required fields
    if (empty($name) || empty($email) || empty($phone) || empty($store_name) || empty($store_address) || empty($password) || empty($confirm_password)) {
        echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email format']);
        exit;
    }

    // Validate password (At least 8 characters, 1 uppercase, 1 special character)
    if (!preg_match('/^(?=.*[A-Z])(?=.*[@&^*]).{8,}$/', $password)) {
        echo json_encode(['status' => 'error', 'message' => 'Password must be at least 8 characters with 1 uppercase and 1 special character (@, &, ^, *)']);
        exit;
    }

    // Check if passwords match
    if ($password !== $confirm_password) {
        echo json_encode(['status' => 'error', 'message' => 'Passwords do not match']);
        exit;
    }

    // Check for duplicate email and store name in a single query
    $stmt = $conn->prepare("SELECT email, store_name FROM admin WHERE email = ? OR store_name = ?");
    $stmt->bind_param("ss", $email, $store_name);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($existing_email, $existing_store);
        $stmt->fetch();

        if ($email === $existing_email) {
            echo json_encode(['status' => 'error', 'message' => 'Email already in use']);
        } elseif ($store_name === $existing_store) {
            echo json_encode(['status' => 'error', 'message' => 'Store name already exists']);
        }

        $stmt->close();
        exit;
    }
    $stmt->close();

    // Hash the password before storing it
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Insert the new admin into the database
    $stmt = $conn->prepare("INSERT INTO admin (name, email, phone, store_name, store_address, password) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $name, $email, $phone, $store_name, $store_address, $password_hash);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Admin account created successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to create account']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
