document.addEventListener("DOMContentLoaded", function () {
    // Obtener el canvas y el contexto
    var canvas = document.getElementById("miCanvas");
    var ctx = canvas.getContext("2d");

    // Crear una nueva imagen
    var img = new Image();
    img.onload = function () {
        // Dibujar la imagen en el canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Establecer la ruta de la imagen de fondo
    img.src = "../img/Extras/border.png";
});
