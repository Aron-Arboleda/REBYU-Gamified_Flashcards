<?php
// Include the database connection
include '../config.php';

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(200);
    exit(0);
}

// Regular request headers for CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// ini_set('session.cookie_lifetime', 259200); // 3 days 
// ini_set('session.gc_maxlifetime', 259200);

// Start session
//session_start();

// Check if the user is already logged in
// if (isset($_SESSION['user_id'])) {
//     http_response_code(200);
//     echo json_encode([
//         "message" => "User already logged in.",
//         "data" => [
//             "user_id" => $_SESSION['user_id'],
//             "user_email" => $_SESSION['user_email'],
//             "user_username" => $_SESSION['user_username'],
//             "user_first_name" => $_SESSION['user_first_name'],
//             "user_last_name" => $_SESSION['user_last_name']
//         ]
//     ]);
//     exit;
// }

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["message" => "Invalid request method."]);
    exit;
}

// Parse the input data (assuming JSON payload)
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (empty($data['user_email']) || empty($data['user_password'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Please provide email and password."]);
    exit;
}

// Sanitize input
$email = $conn->real_escape_string($data['user_email']);
$password = $data['user_password']; // Do not hash yet, as we are verifying against stored hashed password

// Query to find the user by email
$sql = "SELECT user_id, user_username, user_password, user_email, user_first_name, user_last_name FROM users WHERE user_email = ?";

try {
    // Prepare statement
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verify password
        if (password_verify($password, $user['user_password'])) {
            // Regenerate session ID for security
            // session_regenerate_id(true);

            // // Store user details in the session
            // $_SESSION['user_id'] = $user['user_id'];
            // $_SESSION['user_email'] = $user['user_email'];
            // $_SESSION['user_username'] = $user['user_username'];
            // $_SESSION['user_first_name'] = $user['user_first_name'];
            // $_SESSION['user_last_name'] = $user['user_last_name'];

            // Return success response
            http_response_code(200); // OK
            unset($user['user_password']); // Remove the hashed password from the response
            echo json_encode([
                "message" => "Login successful.",
                "data" => $user
            ]);
        } else {
            http_response_code(401); // Unauthorized
            echo json_encode(["message" => "Invalid email or password."]);
        }
    } else {
        http_response_code(401); // Unauthorized
        echo json_encode(["message" => "Invalid email or password."]);
    }
} catch (Exception $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "An error occurred during login.", "error" => $e->getMessage()]);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
