<?php
$requestUri = strtok($_SERVER['REQUEST_URI'], '?'); // Get URI without query string
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Define your routes
$routes = [
    'GET' => [
        '/users' => 'includes/users/read.php',
        '/decks' => 'includes/decks/read_deckWithCards.php',
        '/decks' => 'includes/decks/read_decksOfUser.php',
    ],
    'POST' => [
        '/users' => 'includes/users/create.php',
        '/decks' => 'includes/decks/create.php',
        '/auth_sessions' => 'includes/auth_sessions/login.php',
    ],
    'PUT' => [
        '/decks' => 'includes/decks/update.php',
    ],
    'DELETE' => [
        '/decks' => 'includes/decks/delete.php',
    ],
];

// Match the route
if (isset($routes[$requestMethod][$requestUri])) {
    include $routes[$requestMethod][$requestUri];
} else {
    http_response_code(404);
    echo json_encode(["message" => "Route not found"]);
}
?>
