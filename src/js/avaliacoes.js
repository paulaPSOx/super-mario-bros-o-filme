const starRating = document.querySelectorAll('.star-rating .fas');
const notaInput = document.getElementById('nota');
const avaliacaoForm = document.getElementById('avaliacao-form');
const comentariosDiv = document.getElementById('comentarios');
const marioBlock = document.getElementById('mario-block');
const coin = document.getElementById('coin');
const marioCoinSound = document.getElementById('mario-coin-sound');
const respostaSound = document.getElementById('resposta-enviada-sound');

let ratingValue = 0;

starRating.forEach((star, index) => {
    star.addEventListener('click', () => {
        ratingValue = index + 1;
        notaInput.value = ratingValue;
        updateStarRating();
    });

    star.addEventListener('mouseover', () => highlightStars(index));
    star.addEventListener('mouseout', updateStarRating);
});

function highlightStars(index) {
    starRating.forEach((star, i) => {
        star.classList.toggle('hover', i <= index);
    });
}

function updateStarRating() {
    starRating.forEach((star, i) => {
        star.classList.toggle('selected', i < ratingValue);
        star.classList.remove('hover');
    });
}

function exibirComentario(nome, comentario, nota) {
    const comentarioContainer = document.createElement('div');
    comentarioContainer.classList.add('comentario-container');

    comentarioContainer.innerHTML = `
        <div class="comentario-header">
            <strong class="nome-usuario">${nome}</strong>
            <span class="nota-usuario">${"★".repeat(nota)} (${nota} estrelas)</span>
        </div>
        <p class="comentario-texto">${comentario}</p>
    `;

    comentarioContainer.style.opacity = 0;
    comentariosDiv.prepend(comentarioContainer);
    setTimeout(() => {
        comentarioContainer.style.opacity = 1;
    }, 100);
}

avaliacaoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const comentario = document.getElementById('comentario').value.trim();

    if (!nome || !comentario || ratingValue === 0) {
        alert('Por favor, preencha todos os campos e selecione uma avaliação.');
        return;
    }

    if (comentario.length > 50) {
        alert('O comentário deve ter no máximo 50 caracteres.');
        return;
    }

    alert(`Obrigado(a), ${nome}! Pelo comentário. Clique em "ok" para confirmar.`);

    respostaSound.currentTime = 0; // Reiniciar som
    respostaSound.play();

    exibirComentario(nome, comentario, ratingValue);
    avaliacaoForm.reset();
    ratingValue = 0;
    updateStarRating();
});

marioBlock.addEventListener('click', () => {
    coin.style.display = 'block';
    marioCoinSound.currentTime = 0;
    marioCoinSound.play();
    coin.classList.add('bounce');

    setTimeout(() => {
        coin.style.display = 'none';
        coin.classList.remove('bounce');
    }, 500);
});