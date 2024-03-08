const arrayObjetos = [
    { animal: 'caballo.png', casa: 'casa_caballo.png' },
    { animal: 'cerdo.png', casa: 'casa_cerdo.png' },
    { animal: 'conejo.png', casa: 'casa_conejo.png' },
    { animal: 'gallina.png', casa: 'casa_gallina.png' },
    { animal: 'pajaron.png', casa: 'casa_pajaro.png' },
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
