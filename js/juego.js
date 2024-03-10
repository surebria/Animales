
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
// Obtiene los jugadores locales 
let usersLocal = JSON.parse(localStorage.getItem('usuarios'));
// Obtiene el jugador actual filtrando por nombre
let player = usersLocal.find(jugador => sessionStorage.getItem('jugador') === jugador.usuario);
// Imposible que retorne un null

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
    // Si es 1 es por que acabo el primer nivel, se pasa al segundo
    // En caso de que sea 0 o 2 es por que no ha jugado o ya jugo y presenta a hacerlo de nuevo
    return player.progreso === 1 ? siguientesTres : primerosTres;
};


//Idea: Agregar un contador para saber cuántas veces ha finalizado el juego exitosamente, que se guarde en el localStorage
//TODO 1. Añadir que en la segunda ejecución de la función iniciar, se añadan las siguientes tres casas a los lienzos
//TODO 2. Añadir que en la segunda ejecución de la función iniciar, se añadan los siguientes tres animales a los section de img

//TODO Descomentar todo esto cuando la conexión a localStorage esté lista
//function asignarImagenesAnimales(animalesMostrados)
function asignarImagenesAnimales(TresAnimales) { //TODO Modificar aquí cuando sea la segunda ejecución
    var imagenes = document.querySelectorAll('#containerAnimales > img');

    imagenes.forEach((imagen, index) => {
        imagen.src = TresAnimales[index].animal;
        imagen.dataset.casa = TresAnimales[index].casa; // Asignar el nombre de la casa al atributo de datos
        imagen.dataset.sonido = TresAnimales[index].sonido;
    });
}

function iniciar() {

    if (player.progreso === 1) {
        // Si el progreso es 1, no termino el 2do nivel, se establece el puntaje y tiempo a lo guardado
        puntaje = player.ultPuntaje;
        seconds = player.mejorTiempo;
    }
    var fondosSonidos = shuffleArray(animalesMostrados().map(objeto => {
        return {
            casa: objeto.casa,
            sonido: objeto.sonido
        };
    }));

    var lienzos = document.querySelectorAll('canvas');
    lienzos.forEach((canvas, index) => {

        var fondo = new Image();
        var lienzo = canvas.getContext('2d');
        lienzo.clearRect(0, 0, canvas.width, canvas.height);

        fondo.src = fondosSonidos[index].casa;
        canvas.dataset.casa = fondosSonidos[index].casa;
        canvas.dataset.sonido = fondosSonidos[index].sonido;

        fondo.onload = () => {
            lienzo.drawImage(fondo, 0, 0, canvas.width, canvas.height);
        }

        var imagenes = document.querySelectorAll('#containerAnimales > img');
        if (imagenes.length > 0) {
            // Si existe la variable "imagenes"
            // Es el primer juego, por lo que se asignan los eventos a los animales
            for (var i = 0; i < imagenes.length; i++) {
                imagenes[i].addEventListener('dragstart', arrastrado, false);
                imagenes[i].addEventListener('dragend', finalizado, false);
            }
        } else {
            // Si no existe la variable "imagenes"
            // Es el segundo juego, por lo que se crean los elementos de img y se les asignan los eventos
            for (var i = 0; i < 3; i++) {
                document.getElementById('containerAnimales').appendChild(document.createElement('img'));
                document.getElementById('containerAnimales').lastChild.addEventListener('dragstart', arrastrado, false);
                document.getElementById('containerAnimales').lastChild.addEventListener('dragend', finalizado, false);
                document.getElementById('containerAnimales').lastChild.setAttribute('id', `imagen${i + 1}`);
            }
        }

        canvas.addEventListener('dragenter', eventoEnter, false);
        canvas.addEventListener('dragover', eventoOver, false);

        canvas.addEventListener('drop', (e) => soltado(e, lienzo, canvas), false);
    });
}

function eventoEnter(e) {
    e.preventDefault();
}

function eventoOver(e) {
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

function soltado(e, lienzo, canvas) {
    e.preventDefault();
    var id = e.dataTransfer.getData('Text');
    var elemento = document.getElementById(id);
    var casaAnimal = elemento.dataset.casa;
    var casaCanvas = canvas.dataset.casa;
    var divPuntaje = document.getElementById('puntaje');


    if (casaAnimal === casaCanvas) {
        // El animal se arrastró a la casa correcta
        // Se elimina del div padre para dejarlo sin hijos
        // Jaja, sin hijos, se quedo sin webos
        lienzo.drawImage(elemento, 110, 40, 100, 100);

        elemento.remove();
        // Se dibuja en el lienzo y se oculta del origen
        puntaje += Math.round(Math.floor(Math.random() * 1000) / seconds);
        // Se eleva el puntaje

        // Se ejecuta el audio indicando que es el animal correcto
        var audio = new Audio(canvas.dataset.sonido);
        audio.play();


        // Si no tiene hijos el container significa que arrastro todos los que debía
        if (document.getElementById('containerAnimales').children.length === 0) {
            if (player.progreso !== 1) {
                usersLocal.forEach(jugador => {
                    // Busca al jugador actual y le asigna el progreso 1
                    if (jugador.usuario == player.usuario) {
                        // Si el progreso es diferente de 1  (0 o 2) significa que ya paso el primer nivel, se reorganiza a 1
                        jugador.progreso = 1;
                        // Se guarda el puntaje y el tiempo por si no termina el 2do nivel
                        jugador.mejorTiempo = seconds;
                        jugador.ultPuntaje = puntaje;
                        if (jugador.puntajeMax < puntaje) {
                            jugador.puntajeMax = puntaje;
                        } else if (jugador.mejorTiempo < seconds) {
                            jugador.mejorTiempo = seconds;
                        }
                    }
                });
                localStorage.setItem('usuarios', JSON.stringify(usersLocal));
                sleep(2000).then(() => {
                    iniciar();
                    asignarImagenesAnimales(animalesMostrados());
                });
            } else {
                usersLocal.forEach(jugador => {
                    // Busca al jugador actual y le asigna el progreso 1
                    if (jugador.usuario == player.usuario) {
                        // Si el progreso es diferente de 1  (0 o 2) significa que ya paso el primer nivel, se reorganiza a 1
                        jugador.progreso = 2;
                        jugador.mejorTiempo = seconds;
                        jugador.ultPuntaje = puntaje;
                        if (jugador.mejorTiempo < seconds) {
                            jugador.mejorTiempo = seconds;
                        } else if (jugador.puntajeMax < puntaje) {
                            jugador.puntajeMax = puntaje;
                            const xhr = new XMLHttpRequest();
                            xhr.open('POST', 'AJAX/updateTable.php', true);
                            xhr.setRequestHeader('Content-Type', 'application/json');

                            xhr.onreadystatechange = function () {
                                if (xhr.readyState === 4 && xhr.status === 200) {
                                    // Se guarda el puntaje y el tiempo para mandarlos a la base de datos
                                    localStorage.setItem('usuarios', JSON.stringify(usersLocal));
                                    console.log('Puntaje subido a la base de datos');
                                    sleep(2000).then(() => {
                                        clearInterval(timerInterval);
                                        window.location.href = "fin.html";
                                        // Despues de 2 segundos se llama a fin
                                    });
                                }
                            };

                            const data = {
                                Nombre_de_usuario: jugador.usuario,
                                Maximo_puntaje: jugador.puntajeMax
                            };
                            xhr.send(JSON.stringify(data));

                        }

                    }
                });
            }
        }
    } else {
        // El animal no se arrastró a la casa correcta
        elemento.style.position = 'initial'; // Regresar a la posición original
        puntaje -= Math.round(Math.floor(Math.random() * 100) * seconds);
        // Se resta puntaje por error
        var audio = new Audio("audio/error.mp3");
        audio.play();
        // Se ejecuta el audio indicando que es el animal incorrecto
    }
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Este windows.onload también se hará para las siguientes ejecuciones de la función iniciar
window.onload = function () {
    iniciar();
    asignarImagenesAnimales(animalesMostrados());

    // Iniciar el cronómetro
    timerElement = document.getElementById('timer');
    startTimer(timerElement);


    document.getElementById("botonMusica").addEventListener('click', () => {
        let miAudio = document.getElementById("musicaGameplay");
        let botonSonido = document.getElementById("botonMusica");
        if (miAudio.paused) {
            miAudio.play();
            botonSonido.innerHTML = "<i class='fa-solid fa-volume-high'></i>";
            botonSonido.style.backgroundColor = "hsl(245, 98%, 77%)";
        } else {
            miAudio.pause();
            botonSonido.innerHTML = "<i class='fa-solid fa-volume-xmark'></i>";
            botonSonido.style.backgroundColor = "hsl(0, 90%, 67%)";
        }
    });

    document.getElementById("botonFin").addEventListener('click', () => {
        clearInterval(timerInterval);
        window.location.href = "index.html";
    });
}

