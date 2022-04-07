const cardsArray = [
    './images/bobrossparrot.gif',
    './images/bobrossparrot.gif',
    './images/explodyparrot.gif',
    './images/explodyparrot.gif',
    './images/fiestaparrot.gif',
    './images/fiestaparrot.gif',
    './images/metalparrot.gif',
    './images/metalparrot.gif',
    './images/revertitparrot.gif',
    './images/revertitparrot.gif',
    './images/tripletsparrot.gif',
    './images/tripletsparrot.gif',
    './images/unicornparrot.gif',
    './images/unicornparrot.gif'
];

/*function setMemoryGame() {
    for (let i = 0; i < cardsQuantity; i++) {
        addCard.innerHTML += `
        <li class="card">
            <img src=${cardsArray[i]} class="back-face">
            <img src="./images/front.png" class="front-face">
        </li>`
    }
}*/

function comparator() { 
	return Math.random() - 0.5; 
}

function setUpGame() {
    const cardsQuantity = prompt("Com quantas cartas você quer jogar? (mín. 4 e máx. 14)");
    const addCard = document.querySelector(".cards");
    const gameArray = [];
    
    if (4 <= cardsQuantity && cardsQuantity<= 14 && cardsQuantity % 2 === 0) {
        for (let i = 0; i < cardsQuantity; i++) {
            gameArray[i] = cardsArray[i];
        }

        gameArray.sort(comparator);

        for (let i = 0; i < cardsQuantity; i++) {
            addCard.innerHTML += `
            <li class="card" onclick="flipCard(this)">
                <img src=${gameArray[i]} class="back-face">
                <img src="./images/front.png" class="front-face">
            </li>`
        }
    } else {
        alert("Quantidade inválida!")
        setUpGame();   
    }
}

function flipCard(card) {
   card.classList.toggle("flip");

   


}

setUpGame();