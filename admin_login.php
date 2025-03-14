<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors directly to browser

// Include connection
include 'connect.php';

// Set header
header('Content-Type: application/json');

// Initialize error handler
function returnError($message, $details = null) {
    $response = ['status' => 'error', 'message' => $message];
    if ($details && getenv('ENVIRONMENT') !== 'production') {
        $response['details'] = $details;
    }
    echo json_encode($response);
    exit();
}

// Check if connect.php succeeded
if (!isset($conn) || !$conn) {
    returnError("Database connection failed", mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate required fields
    if (!isset($_POST['email']) || !isset($_POST['password'])) {
        returnError("Missing required fields");
    }

    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];

    // Prepare the statement
    $query = "SELECT * FROM admin WHERE email=?";
    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $query)) {
        returnError("Statement preparation failed", mysqli_error($conn));
    }

    // Bind parameters and execute
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (!$result) {
        returnError("Query execution failed", mysqli_error($conn));
    }

    $row = mysqli_fetch_assoc($result);

    if (!$row) {
        echo json_encode(['status' => 'invalid_user', 'message' => 'User not found']);
    } else {
        $pwdHashed = $row["password"];
        
        // Verify password if the hash exists
        if (!$pwdHashed) {
            returnError("Password hash missing in database");
        }
        
        $checkedpwd = password_verify($password, $pwdHashed);

        if ($checkedpwd === false) {
            echo json_encode(['status' => 'invalid_user', 'message' => 'Incorrect password']);
        } else if ($checkedpwd === true) {
            session_start();
            $_SESSION["id"] = $row["id"];
            $_SESSION["email"] = $row["email"];
            $_SESSION["name"] = $row["name"];
            $_SESSION["store"] = $row["store"];

            echo json_encode([
                'status' => 'success',
                'message' => 'Login successful',
                'redirect_url' => 'admin_dashboard.html'
            ]);
        }
    }
} else {
    returnError("Invalid request method");
}
?>