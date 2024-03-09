
const arrayObjetos = [
    { animal: 'img/Animales/caballo.png', casa: 'img/casas/casa_caballo.png' , sonido: "../audio/caballo.mp3"},
    { animal: 'img/Animales/cerdo.png', casa: 'img/casas/casa_cerdo.png' },
    { animal: 'img/Animales/conejo.png', casa: 'img/casas/casa_conejo.png' },
    { animal: 'img/Animales/gallina.png', casa: 'img/casas/casa_gallina.png' },
    { animal: 'img/Animales/pajaro.png', casa: 'img/casas/casa_pajaro.png' },
    { animal: 'img/Animales/pato.png', casa: 'img/casas/casa_pato.png' },
    { animal: 'img/Animales/perro.png', casa: 'img/casas/casa_perro.png' },
    { animal: 'img/Animales/pez.png', casa: 'img/casas/casa_pez.png' },
    { animal: 'img/Animales/rana.png', casa: 'img/casas/casa_rana.png' },
    { animal: 'img/Animales/vaca.png', casa: 'img/casas/casa_vaca.png' }
];

console.log(arrayObjetos);
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
console.log(primerosTres);

// Este windows.onload también se hará para las siguientes ejecuciones de la función iniciar
window.onload = function (){

    asignarImagenesAnimales(primerosTres);
}

//TODO 1. Añadir que en la segunda ejecución de la función iniciar, se añadan las siguientes tres casas a los lienzos
//TODO 2. Añadir que en la tercera ejecución de la función iniciar, se añadan los siguientes tres animales a los section de img
//Puede ser con un if, que que si el array de imagenes tiene 3 elementos, se añadan las siguientes tres casas


const siguientesTres = arrayObjetosShuffled.slice(3, 6);




function asignarImagenesAnimales(primerosTres) {
    var imagenes = document.querySelectorAll('#containerAnimales > section > img');
    imagenes.forEach((imagen, index) => {
        imagen.src = primerosTres[index].animal;
    });

}

function iniciar() {

    var fondos = shuffleArray(primerosTres.slice(0, 3).map(objeto => objeto.casa));

    var lienzos = document.querySelectorAll('canvas');
    lienzos.forEach((soltar, index) => {
        var fondo = new Image();
        fondo.src = fondos[index];
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
    elemento.style.visibility = 'hidden';
}

function arrastrado(e) {
    elemento = e.target;
    e.dataTransfer.setData('Text', elemento.getAttribute('id'));
    e.dataTransfer.setDragImage(e.target, 0, 0);
}

function soltado(e, lienzo, soltar) {
    e.preventDefault();
    var id = e.dataTransfer.getData('Text');
    var elemento = document.getElementById(id);
    var posX = e.pageX - soltar.offsetLeft;
    var posY = e.pageY - soltar.offsetTop;
    lienzo.drawImage(elemento, posX, posY);
}

window.addEventListener('load', iniciar, false);