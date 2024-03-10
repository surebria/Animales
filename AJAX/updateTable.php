<?php
$servername = "localhost";
$username = "id21973967_juanito";
$password = "GinaCochina2024?";
$dbname = "id21973967_granjadb";

// Create connection
$sql = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($sql->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Recibir datos por AJAX
$data = json_decode(file_get_contents('php://input'), true);
$maximo_puntaje = $data['Maximo_puntaje'];
$usuario = $data['Nombre_de_usuario'];

// Preparar la sentencia SQL
$stmt = $sql->prepare("INSERT INTO usuarios (Nombre_de_usuario, Maximo_puntaje) VALUES (?, ?) ON DUPLICATE KEY UPDATE maximo_puntaje = ?");
$stmt->bind_param("sis", $usuario, $maximo_puntaje, $maximo_puntaje);

// Ejecutar la sentencia SQL
$stmt->execute();

// Cerrar la sentencia
$stmt->close();
?>
