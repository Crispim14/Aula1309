var imageDataGlobal = null; // Variável global para armazenar a imagem

function takePicture() {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 300, // Reduzindo a largura da imagem
        targetHeight: 300 // Reduzindo a altura da imagem
    });
}

function onSuccess(imageData) {
    imageDataGlobal = imageData; // Armazenando a imagem para envio posterior
    var image = document.createElement('img');
    image.src = "data:image/jpeg;base64," + imageData;
    image.style.width = "50%"; // Ajustando o tamanho da imagem exibida
    image.style.height = "auto";
    
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('imagePreview').appendChild(image);

    document.getElementById('uploadButton').disabled = false;
}

function onFail(message) {
    alert('Falha ao capturar imagem: ' + message);
}

function uploadImage() {
    if (!imageDataGlobal) {
        alert('Nenhuma imagem para enviar!');
        return;
    }
    
    var xhr = new XMLHttpRequest();
    var url = "http://10.0.2.2/camera_foto/upload.php"; 
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                alert(xhr.responseText); 
            } else {
                alert('Erro ao enviar a imagem. Código de status: ' + xhr.status);
            }
            document.getElementById('uploadButton').disabled = true; 
        }
    };
    var data = "image=" + encodeURIComponent("data:image/jpeg;base64," + imageDataGlobal);
    xhr.send(data);
}
