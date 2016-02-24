<?php

$user = 'root';
$password = '';
$database = 'Gradients';
$table = 'Gradient';

$connection = mysqli_connect('localhost', $user, $password, $database) or die("Unable to connect to database.");


mysqli_query($connection, "INSERT INTO Gradient (Colors) VALUES ('#9E7D38#E555ED')");

 ?>
