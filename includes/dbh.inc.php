<!-- database handler include file -->

<?php

// data source name, information needed to connect to the database
$dsn = "mysql:host=localhost;dbname=rebyu_webapp_db"; // change dbname to the name of the database
$dbusername = "root"; // username of the database
$dbpassword = "ONTynZjNNxpYke6q"; // password of the database

try {
  //php data objects, a way to connect to the database, mysqlI is another way, pdo is more secure and flexible
  //php data objects, a way for us to create a database object when we want to connect to a database
  //basically we turn the connection into an object that we can use inside our php code and just refer to that object whenever we want to connect to the database
  $pdo = new PDO($dsn, $dbusername, $dbpassword); //this line is the most important one

  //allows us to set attributes about this particular object that we created, for example how do we want to handle error messages we may run into when we try to connect to the database
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  // now we're saying that if we get an error then we want to throw an exception, and we want to catch that exception and do something with it
} catch (PDOException $e) {
  // . is a concantenation operator, -> is like a dot in javascript
  echo "Connection failed: " . $e->getMessage();
  
}

?>