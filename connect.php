<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname="quicktrack";

// Create connection
$conn =  mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
// echo "Connected successfully";
?>