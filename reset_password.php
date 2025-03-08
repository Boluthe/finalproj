<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid email address']);
        exit;
    }

    // Here you would typically check if the email exists in your database
    // and send a password reset link to the user's email.
    // For demonstration purposes, we'll assume the email exists and the link is sent.

    // Simulate sending email
    $reset_link = "https://yourdomain.com/reset_password?token=" . bin2hex(random_bytes(16));
    // mail($email, "Password Reset", "Click the following link to reset your password: $reset_link");

    echo json_encode(['message' => 'Password reset link has been sent to your email']);
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
