<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "ONTynZjNNxpYke6q";
$dbname = "rebyu_webapp_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>