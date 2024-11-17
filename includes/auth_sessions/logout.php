<?php

include '../config.php';

// Start session
session_start();

// Destroy the session
session_unset();
session_destroy();

// Optionally remove the session cookie
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        '',
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

// Return success response
http_response_code(200);
echo json_encode(["message" => "Logged out successfully."]);
?>
