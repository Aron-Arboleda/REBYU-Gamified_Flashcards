<?php
// Include the database connection
include '../config.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
if (empty($data['deck_title']) || empty($data['user_id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Please provide deck_title and user_id."]);
    exit;
}

// Validate cards array (optional validation if cards are included)
if (isset($data['cards']) && !is_array($data['cards'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "Invalid cards format."]);
    exit;
}


// Sanitize input
$deck_title = $conn->real_escape_string($data['deck_title']);
$deck_description = isset($data['deck_description']) 
    ? $conn->real_escape_string($data['deck_description']) 
    : null;
$user_id = $conn->real_escape_string($data['user_id']);

// Start a transaction
$conn->begin_transaction();

try {
    // Insert the deck

    error_log("deck_title: " . $deck_title . "\n"); // Log the raw input data
    error_log("deck_description: " . $deck_description . "\n"); // Log the raw input data
    error_log("user_id: " . $user_id . "\n"); // Log the raw input data
    
    $sql_deck = "INSERT INTO decks (deck_title, deck_description, user_id) VALUES ('$deck_title', '$deck_description', '$user_id')";

    error_log("sql_deck: " . $sql_deck . "\n"); // Log the raw input data
    
    if (!$conn->query($sql_deck)) {
        throw new Exception("Error creating deck: " . $conn->error);
    }

    // Get the deck_id of the newly created deck
    $deck_id = $conn->insert_id;

    // Insert the cards (if any are provided)
    if (!empty($data['cards'])) {
        foreach ($data['cards'] as $card) {
            if (empty($card['card_term'])) {
                throw new Exception("Each card must have atleast a term.");
            }

            $card_term = $conn->real_escape_string($card['card_term']);
            $card_definition = $conn->real_escape_string($card['card_definition']);

            $sql_card = "INSERT INTO cards (card_term, card_definition, deck_id) VALUES ('$card_term', '$card_definition', '$deck_id')";

            if (!$conn->query($sql_card)) {
                throw new Exception("Error creating card: " . $conn->error);
            }
        }
    }

    // Commit the transaction
    $conn->commit();

    http_response_code(201); // Created
    echo json_encode(["message" => "Deck and cards created successfully.", "deck_id" => $deck_id]);
} catch (Exception $e) {
    // Rollback the transaction on error
    $conn->rollback();
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "Failed to create deck and cards.", "error" => $e->getMessage()]);
}

// Close the database connection
$conn->close();
?>
