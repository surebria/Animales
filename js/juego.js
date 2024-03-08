const arrayObjetos = [
    { animal: 'Perro', casa: 'Casa 1' },
    { animal: 'Gato', casa: 'Casa 2' },
    { animal: 'Pájaro', casa: 'Casa 3' },
    { animal: 'Elefante', casa: 'Casa 4' },
    { animal: 'León', casa: 'Casa 5' },
    { animal: 'Tigre', casa: 'Casa 6' },
    { animal: 'Oso', casa: 'Casa 7' },
    { animal: 'Cebra', casa: 'Casa 8' },
    { animal: 'Jirafa', casa: 'Casa 9' }
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
