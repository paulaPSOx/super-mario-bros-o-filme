const botaoTrailer = document.querySelector(".botao-trailer");
const modal = document.querySelector(".modal");
const botaoFecharModal = document.querySelector(".fechar-modal");
const video = document.getElementById("video");
const linkDoVideo = video.src;
const marioBlock = document.getElementById('mario-block');
const coin = document.getElementById('coin');
const marioCoinSound = document.getElementById('mario-coin-sound');

function alternarModal() {     
    modal.classList.toggle("aberto"); 
}

botaoTrailer.addEventListener("click", () => {
    alternarModal();   
    video.setAttribute("src", linkDoVideo);   
});

botaoFecharModal.addEventListener("click", () => {   
    alternarModal();     
    video.setAttribute("src", ""); // Para parar o vídeo
});

marioBlock.addEventListener('click', () => {
    coin.style.display = 'block';
    marioCoinSound.currentTime = 0; // Reiniciar o som
    marioCoinSound.play();
    coin.classList.add('bounce');

    setTimeout(() => {
        coin.style.display = 'none';
        coin.classList.remove('bounce');
    }, 500);
});