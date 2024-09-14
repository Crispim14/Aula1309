<?php

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "imagedb";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}


if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['image'])) {

    $imageData = $_POST['image'];


    $imageData = str_replace('data:image/jpeg;base64,', '', $imageData);
    $imageData = str_replace(' ', '+', $imageData);
    $imgContent = base64_decode($imageData);

    $sql = "INSERT INTO images (image) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("b", $imgContent);
    
    if ($stmt->execute()) {
        echo "Imagem salva com sucesso!";
    } else {
        echo "Erro ao salvar a imagem: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Nenhuma imagem foi enviada.";
}

$conn->close();
?>
