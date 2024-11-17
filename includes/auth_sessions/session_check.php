<?php

include '../config.php';

ini_set('session.cookie_lifetime', 259200); // 3 days 
ini_set('session.gc_maxlifetime', 259200);
ini_set('session.cookie_path', '/'); // Makes session cookies accessible site-wide
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', true); // Only if using HTTPS
// Start session
session_start(); // Start the session

// echo "Session ID: " . session_id();
// print_r($_SESSION);

if (isset($_SESSION['user_id'])) {
    // Session is valid, return true with user data
    echo json_encode([
        "loggedIn" => true,
        "message" => "User is logged in.",
        "user" => [
            "user_id" => $_SESSION['user_id'],
            "user_email" => $_SESSION['user_email'],
            "user_username" => $_SESSION['user_username'],
            "user_first_name" => $_SESSION['user_first_name'],
            "user_last_name" => $_SESSION['user_last_name']
        ]
    ]);
} else {
    // Session is not valid, return false with an error message
    echo json_encode([
        "loggedIn" => false,
        "message" => "Session expired. Please log in again."
    ]);
}
?>
