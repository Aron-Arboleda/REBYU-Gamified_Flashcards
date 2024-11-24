<?php
// Include the database connection
include '../config.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["message" => "Invalid request method."]);
    exit;
}

// Check if deck_id and user_id are provided
if (!isset($_GET['deck_id']) || !isset($_GET['user_id'])) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "deck_id and user_id are required."]);
    exit;
}

$deck_id = $conn->real_escape_string($_GET['deck_id']);
$user_id = $conn->real_escape_string($_GET['user_id']);

// Start a transaction to ensure the consistency of the operations
$conn->begin_transaction();

try {
    // Fetch the deck with the specific user_id
    $sql_deck = "SELECT * FROM decks WHERE deck_id = '$deck_id' AND user_id = '$user_id' LIMIT 1";
    $result_deck = $conn->query($sql_deck);

    if ($result_deck->num_rows === 0) {
        throw new Exception("Deck not found or access denied.");
    }

    $deck = $result_deck->fetch_assoc();

    // Fetch the cards associated with the deck
    $sql_cards = "SELECT * FROM cards WHERE deck_id = '$deck_id'";
    $result_cards = $conn->query($sql_cards);

    $cards = [];
    while ($card = $result_cards->fetch_assoc()) {
        $cards[] = $card;
    }

    // Commit the transaction as everything is successful
    $conn->commit();

    // Return the deck and its cards in the response
    http_response_code(200); // OK
    echo json_encode([
        "deck" => $deck,
        "cards" => $cards
    ]);
} catch (Exception $e) {
    // Rollback the transaction in case of error
    $conn->rollback();
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "An error occurred: " . $e->getMessage()]);
} finally {
    // Close the database connection
    $conn->close();
}
?>
