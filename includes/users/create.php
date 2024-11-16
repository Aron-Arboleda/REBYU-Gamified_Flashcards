<?php
// Include the database connection
include '../config.php';

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");  // Allow any origin or specify a specific one
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(200);  // Send a success response for preflight
    exit(0);  // End the request here for OPTIONS
}

// Your regular POST request handling code below
header("Access-Control-Allow-Origin: *"); // Allow any origin or specify a specific one
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["message" => "Invalid request method."]);
    exit;
}

// Parse the input data (assuming JSON payload)
$data = json_decode(file_get_contents('php://input'), true);

// Validate the required fields
if (empty($data['user_username']) || empty($data['user_password']) || empty($data['user_email']) || empty($data['user_first_name']) || empty($data['user_last_name'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Please provide username, email, and password."]);
    exit;
}

// Sanitize input
$username = $conn->real_escape_string($data['user_username']);
$password = password_hash($data['user_password'], PASSWORD_BCRYPT); // Hash the password
$email = $conn->real_escape_string($data['user_email']);
$first_name = $conn->real_escape_string($data['user_first_name']);
$last_name = $conn->real_escape_string($data['user_last_name']);

// Insert into the database
$sql = "INSERT INTO users (user_username, user_password, user_email, user_first_name, user_last_name) VALUES ('$username', '$password', '$email', '$first_name', '$last_name')";

try {
    if ($conn->query($sql) === TRUE) {
        http_response_code(201); // Created
        echo json_encode(["message" => "User created successfully.", "user_id" => $conn->insert_id]);
    } else {
        throw new Exception("Error: " . $conn->error);
    }
} catch (Exception $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "Failed to create user.", "error" => $e->getMessage()]);
}

// Close the database connection
$conn->close();
?>
