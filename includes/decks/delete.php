<?php
// Include the database connection
include '../config.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(200);
    exit(0);
}

// Regular POST request handling
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Invalid request method."]);
    exit;
}

// Parse the input data (assuming JSON payload)
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

// Check for JSON parsing errors
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Invalid JSON payload."]);
    exit;
}

// Validate deck_id
if (empty($data['deck_id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Please provide a valid deck_id."]);
    exit;
}

// Sanitize input
$deck_id = $conn->real_escape_string($data['deck_id']);

// Start a transaction
$conn->begin_transaction();

try {
    // Delete the cards associated with the deck
    $sql_delete_cards = "DELETE FROM cards WHERE deck_id = '$deck_id'";
    if (!$conn->query($sql_delete_cards)) {
        throw new Exception("Error deleting cards: " . $conn->error);
    }

    // Delete the deck itself
    $sql_delete_deck = "DELETE FROM decks WHERE deck_id = '$deck_id'";
    if (!$conn->query($sql_delete_deck)) {
        throw new Exception("Error deleting deck: " . $conn->error);
    }

    // Commit the transaction
    $conn->commit();

    http_response_code(200); // OK
    echo json_encode(["message" => "Deck and associated cards deleted successfully."]);
} catch (Exception $e) {
    // Rollback the transaction on error
    $conn->rollback();
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "Failed to delete deck.", "error" => $e->getMessage()]);
}

// Close the database connection
$conn->close();
?>
