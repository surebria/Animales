document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("miCanvas");
    var ctx = canvas.getContext("2d");

    var img = new Image();
    img.src = "img/Extras/border.png";
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

});

document.addEventListener("DOMContentLoaded", function () {
    var fechaActual = new Date().toLocaleDateString();
    var fechaElement = document.querySelector('.date');
    fechaElement.textContent = 'Fecha: ' + fechaActual;
});

var miAudio = document.getElementById("miAudio");
var botonSonido = document.getElementById("botonSonido");

function toggleSonido() {
    if (miAudio.paused) {
        miAudio.play();
        botonSonido.innerHTML = "<i class='fa-solid fa-volume-high'></i>";
        botonSonido.style.backgroundColor = "hsl(245, 98%, 77%)";
    } else {
        miAudio.pause();
        botonSonido.innerHTML = "<i class='fa-solid fa-volume-xmark'></i>";
        botonSonido.style.backgroundColor = "hsl(0, 90%, 67%)";
    }
}


botonSonido.addEventListener("click", toggleSonido);

document.querySelectorAll("button").forEach(function (button) {
    var sonidoBoton = document.getElementById("sonidoBoton");
    button.addEventListener("click", function () {
        sonidoBoton.play();
    });
});

