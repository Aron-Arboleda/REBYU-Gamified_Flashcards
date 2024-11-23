<?php
// Include the database connection
include '../config.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["message" => "Invalid request method."]);
    exit;
}

// Get user_id from query parameters
if (!isset($_GET['user_id']) || empty($_GET['user_id'])) {
    http_response_code(400);
    echo json_encode(["message" => "user_id is required."]);
    exit;
}

$user_id = $_GET['user_id'];

// Fetch all decks for the given user_id
try {
    $sql = "SELECT deck_id, deck_title, deck_description FROM decks WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id); // Bind the user_id parameter to the query
    $stmt->execute();
    $result = $stmt->get_result();
    $decks = [];

    if ($result->num_rows > 0) {
        

        // Fetch all the rows and store them in an array
        while ($row = $result->fetch_assoc()) {
            $decks[] = $row;
        }

        // Send a successful response with the decks data
        http_response_code(200);
        echo json_encode(["decks" => $decks]);
    } else {
        http_response_code(200);
        echo json_encode(["decks" => $decks]);
    }
} catch (Exception $e) {
    // Handle any errors
    http_response_code(500);
    echo json_encode(["message" => "Failed to retrieve decks.", "error" => $e->getMessage()]);
}

// Close the database connection
$conn->close();
?>
