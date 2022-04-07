function setUpGame() {
    const cardsQuantity = prompt("Com quantas cartas você quer jogar? (mín. 4 e máx. 14)");
    const addCard = document.querySelector(".cards");

    for (let i = 0; i < cardsQuantity; i++) {
        addCard.innerHTML += `
        <li class="card">
            <img src="./images/front.png">
        </li>`
    }
}

setUpGame();