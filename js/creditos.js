document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("miCanvas");
    var ctx = canvas.getContext("2d");

    var img = new Image();
    img.src = "../img/Extras/border.png";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

});

document.addEventListener("DOMContentLoaded", function () {
    var fechaActual = new Date().toLocaleDateString();
    var fechaElement = document.querySelector('.date');
    fechaElement.textContent = 'Fecha: ' + fechaActual;
});

