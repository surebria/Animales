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
