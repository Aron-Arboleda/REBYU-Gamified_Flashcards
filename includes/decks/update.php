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
error_log("Raw input data: " . $rawData); // Log the raw input data
$data = json_decode($rawData, true);

// Check for JSON parsing errors
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Invalid JSON payload."]);
    exit;
}

// Validate deck fields
if (empty($data['deck_id']) || empty($data['deck_title'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Please provide deck_id and deck_title."]);
    exit;
}

// Sanitize input
$deck_id = $conn->real_escape_string($data['deck_id']);
$deck_title = $conn->real_escape_string($data['deck_title']);
$deck_description = isset($data['deck_description']) 
    ? $conn->real_escape_string($data['deck_description']) 
    : null;

// Start a transaction
$conn->begin_transaction();

try {
    // Update the deck
    $sql_update_deck = "UPDATE decks SET deck_title = '$deck_title', deck_description = '$deck_description' WHERE deck_id = '$deck_id'";

    if (!$conn->query($sql_update_deck)) {
        throw new Exception("Error updating deck: " . $conn->error);
    }

    // Handle cards update (if any are provided)
    if (isset($data['cards']) && is_array($data['cards'])) {
        // Delete all existing cards for the deck
        $sql_delete_cards = "DELETE FROM cards WHERE deck_id = '$deck_id'";
        if (!$conn->query($sql_delete_cards)) {
            throw new Exception("Error deleting old cards: " . $conn->error);
        }

        // Insert updated cards
        foreach ($data['cards'] as $card) {
            if (empty($card['card_term'])) {
                throw new Exception("Each card must have at least a term.");
            }

            $card_term = $conn->real_escape_string($card['card_term']);
            $card_definition = isset($card['card_definition'])
                ? $conn->real_escape_string($card['card_definition'])
                : null;

            $sql_insert_card = "INSERT INTO cards (card_term, card_definition, deck_id) VALUES ('$card_term', '$card_definition', '$deck_id')";
            if (!$conn->query($sql_insert_card)) {
                throw new Exception("Error inserting updated cards: " . $conn->error);
            }
        }
    }

    // Commit the transaction
    $conn->commit();

    http_response_code(200); // Success
    echo json_encode(["message" => "Deck and cards updated successfully."]);
} catch (Exception $e) {
    // Rollback the transaction on error
    $conn->rollback();
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "Failed to update deck and cards.", "error" => $e->getMessage()]);
}

// Close the database connection
$conn->close();
?>
