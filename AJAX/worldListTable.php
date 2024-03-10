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

$stmt = $sql->prepare("SELECT * FROM usuarios ORDER BY Maximo_puntaje DESC LIMIT 5;");
$stmt->execute();
$result = $stmt->get_result();

$usuarios = array();

while ($row = $result->fetch_assoc()) {
    $usuarios[] = array(
        'Nombre_de_usuario' => $row['Nombre_de_usuario'],
        'Maximo_puntaje' => $row['Maximo_puntaje']
    );
}

echo json_encode($usuarios);

$stmt->close();
