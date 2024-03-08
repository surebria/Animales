const arrayObjetos = [
    { animal: 'caballo.png', casa: 'casa_caballo.png' },
    { animal: 'cerdo.png', casa: 'casa_cerdo.png' },
    { animal: 'conejo.png', casa: 'casa_conejo.png' },
    { animal: 'gallina.png', casa: 'casa_gallina.png' },
    { animal: 'pajaro.png', casa: 'casa_pajaro.png' },
    { animal: 'pato.png', casa: 'casa_pato.png' },
    { animal: 'perro.png', casa: 'casa_perro.png' },
    { animal: 'pez.png', casa: 'casa_pez.png' },
    { animal: 'rana.png', casa: 'casa_rana.png' },
    { animal: 'vaca.png', casa: 'casa_vaca.png' }
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
const primerosSeis = arrayObjetosShuffled.slice(0, 6);

C
// console.log(primerosSeis);


function iniciar() {

    var fondos = primerosSeis.slice(0, 3).map(objeto => objeto.animal);

    var lienzos = document.querySelectorAll('canvas');
    lienzos.forEach((soltar, index) => {
        var lienzo = soltar.getContext('2d');
        var fondo = new Image();
        fondo.src = fondos[index];
        fondo.onload = () => {
            lienzo.drawImage(fondo, 0, 0, soltar.width, soltar.height);
        }

        var imagenes = document.querySelectorAll('#container > section > img');
        for (var i = 0; i < imagenes.length; i++) {
            imagenes[i].addEventListener('dragstart', arrastrado, false);
            imagenes[i].addEventListener('dragend', finalizado, false);
        }
        soltar.addEventListener('dragenter', eventoEnter, false);
        soltar.addEventListener('dragover', eventoOver, false);
        soltar.addEventListener('drop', function(e) {
            soltado(e, lienzo, soltar);
        }, false);
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