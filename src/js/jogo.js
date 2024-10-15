const acertouSom = new Audio('src/sounds/acertou.mp3');
const errouSom = new Audio('src/sounds/errou.mp3');
const vitoriaSom = new Audio('src/sounds/vitoria.mp3');
const recomecarSom = new Audio('src/sounds/recomecar.mp3');

const cardImages = [
    'goomba.png', 
    'koopa.png', 
    'luigi.png', 
    'mario.png', 
    'peach.png', 
    'toad.png', 
    'bowser.png',
    'yoshi.png',
    'goomba.png', 
    'koopa.png', 
    'luigi.png', 
    'mario.png', 
    'peach.png', 
    'toad.png', 
    'bowser.png',
    'yoshi.png'
];

const cardContainer = document.querySelector('.card-container');

cardImages.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-name', image.split('.')[0]);

    card.innerHTML = `
        <div class="inner-card">
            <div class="front-face">?</div>
            <div class="back-face">
                <img src="src/imagens/${image}" alt="${image}" style="width: 100%; height: 100%; border-radius: 8px;">
            </div>
        </div>
    `;

    cardContainer.appendChild(card);
});

const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchCount = 0;

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        acertouSom.play();
        disableCards();
        matchCount += 1;

        if (matchCount === cardImages.length / 2) {
            setTimeout(() => {
                vitoriaSom.play();
            }, 500);
        }
    } else {
        errouSom.play();
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

(function shuffle() {
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

document.getElementById('reset-button').addEventListener('click', () => {
    recomecarSom.play();
    const recomecarDuracao = recomecarSom.duration * 1000;

    setTimeout(() => {
        location.reload();
    }, recomecarDuracao);
});