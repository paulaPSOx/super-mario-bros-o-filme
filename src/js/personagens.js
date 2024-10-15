document.addEventListener("DOMContentLoaded", () => {

    const personagens = document.querySelectorAll(".personagens article");

    personagens.forEach(personagem => {
        personagem.addEventListener("click", () => {

            const soundPath = personagem.getAttribute("data-sound");

            new Audio(soundPath).play();
        });
    });
});