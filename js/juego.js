
const arrayObjetos = [
    { animal: 'img/Animales/caballo.png', casa: 'img/casas/casa_caballo.png', sonido: "audio/caballo.mp3" },
    { animal: 'img/Animales/cerdo.png', casa: 'img/casas/casa_cerdo.png', sonido: "audio/cerdo.mp3" },
    { animal: 'img/Animales/conejo.png', casa: 'img/casas/casa_conejo.png', sonido: "audio/conejo.mp3" },
    { animal: 'img/Animales/gallina.png', casa: 'img/casas/casa_gallina.png', sonido: "audio/gallina.mp3" },
    { animal: 'img/Animales/pajaro.png', casa: 'img/casas/casa_pajaro.png', sonido: "audio/pajaro.mp3" },
    { animal: 'img/Animales/pato.png', casa: 'img/casas/casa_pato.png', sonido: "audio/pato.mp3" },
    { animal: 'img/Animales/perro.png', casa: 'img/casas/casa_perro.png', sonido: "audio/perro.mp3" },
    { animal: 'img/Animales/pez.png', casa: 'img/casas/casa_pez.png', sonido: "audio/pez.mp3" },
    { animal: 'img/Animales/rana.png', casa: 'img/casas/casa_rana.png', sonido: "audio/rana.mp3" },
    { animal: 'img/Animales/vaca.png', casa: 'img/casas/casa_vaca.png', sonido: "audio/vaca.mp3" }
];
let puntaje = 0;
let seconds = 0;
let timerInterval;

const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};

const arrayObjetosShuffled = shuffleArray(arrayObjetos);
const primerosTres = arrayObjetosShuffled.slice(0, 3);
const siguientesTres = arrayObjetosShuffled.slice(3, 6);

var animalesMostrados = () => {

    //TODO Aquí va a estar una conexión con el localStorage para saber en qué nivel se encuentra el jugador
    //niveleEjecutados = localStorage.getItem('nivelesEjecutado');
    return nivelEjecutado === 1 ? primerosTres : siguientesTres;
};


//Idea: Agregar un contador para saber cuántas veces ha finalizado el juego exitosamente, que se guarde en el localStorage
//TODO 1. Añadir que en la segunda ejecución de la función iniciar, se añadan las siguientes tres casas a los lienzos
//TODO 2. Añadir que en la segunda ejecución de la función iniciar, se añadan los siguientes tres animales a los section de img

//TODO Descomentar todo esto cuando la conexión a localStorage esté lista
//function asignarImagenesAnimales(animalesMostrados)
function asignarImagenesAnimales(primerosTres) { //TODO Modificar aquí cuando sea la segunda ejecución
    var imagenes = document.querySelectorAll('#containerAnimales > section > img');

    imagenes.forEach((imagen, index) => {
        imagen.src = primerosTres[index].animal;
        imagen.dataset.casa = primerosTres[index].casa; // Asignar el nombre de la casa al atributo de datos
        imagen.dataset.sonido = primerosTres[index].sonido;
    });
}

function iniciar() {

    // console.log(primerosTres);
    var fondosSonidos = shuffleArray(primerosTres.map(objeto => {
        return {
            casa: objeto.casa,
            sonido: objeto.sonido
        };
    })); //TODO También modificar aquí en segunda ejecución
    //shuffleArray(animalesMostrados / / / )


    var lienzos = document.querySelectorAll('canvas');
    lienzos.forEach((soltar, index) => {
        // console.log(soltar);
        var fondo = new Image();

        fondo.src = fondosSonidos[index].casa;
        // console.log(fondo.src);
        soltar.dataset.casa = fondosSonidos[index].casa; // Asignar el nombre de la casa al atributo de datos
        soltar.dataset.sonido = fondosSonidos[index].sonido;


        fondo.onload = () => {
            lienzo.drawImage(fondo, 0, 0, soltar.width, soltar.height);
        }

        var imagenes = document.querySelectorAll('#containerAnimales > section > img');
        for (var i = 0; i < imagenes.length; i++) {
            imagenes[i].addEventListener('dragstart', arrastrado, false);
            imagenes[i].addEventListener('dragend', finalizado, false);
        }

        var lienzo = soltar.getContext('2d');
        soltar.addEventListener('dragenter', eventoEnter, false);
        soltar.addEventListener('dragover', eventoOver, false);

        soltar.addEventListener('drop', (e) => soltado(e, lienzo, soltar), false);
    });
}

function eventoEnter(e) {
    console.log("Soy el evento DragEnter");
    e.preventDefault();
}

function eventoOver(e) {
    console.log("Soy el evento DragOver");
    e.preventDefault();
}

function finalizado(e) {
    elemento = e.target;
    // elemento.style.visibility = 'hidden';
}

function arrastrado(e) {
    elemento = e.target;
    e.dataTransfer.setData('Text', elemento.getAttribute('id'));
    e.dataTransfer.setDragImage(e.target, e.target.width / 2, e.target.height / 2);
}

function soltado(e, lienzo, soltar) {
    e.preventDefault();
    var id = e.dataTransfer.getData('Text');
    var elemento = document.getElementById(id);
    var posX = e.pageX - soltar.offsetLeft;
    var posY = e.pageY - soltar.offsetTop;
    var casaAnimal = elemento.dataset.casa;
    var casaCanvas = soltar.dataset.casa;
    var divPuntaje = document.getElementById('puntaje');

    if (casaAnimal === casaCanvas) {
        // El animal se arrastró a la casa correcta
        lienzo.drawImage(elemento, posX, posY);
        elemento.draggable = false;
        elemento.style.visibility = 'hidden';
        // Se dibuja en el lienzo y se oculta del origen
        puntaje += Math.round(Math.floor(Math.random() * 1000) / seconds);
        // Se eleva el puntaje

        // Se ejecuta el audio indicando que es el animal correcto
        var audio = new Audio(soltar.dataset.sonido);
        audio.play();
    } else {
        // El animal no se arrastró a la casa correcta
        elemento.style.position = 'initial'; // Regresar a la posición original
        puntaje -= Math.round(Math.floor(Math.random() * 100) * seconds);
        //TODO Llamar al sonido de que es incorrecta

    }
    // console.log("hola perra");
    divPuntaje.innerHTML = puntaje;
}
function startTimer(timerElement) {
    timerInterval = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerElement.innerHTML = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }, 1000);
}


// Este windows.onload también se hará para las siguientes ejecuciones de la función iniciar
window.onload = function () {
    iniciar();
    asignarImagenesAnimales(primerosTres);

    // Iniciar el cronómetro
    timerElement = document.getElementById('timer');
    startTimer(timerElement);
}

