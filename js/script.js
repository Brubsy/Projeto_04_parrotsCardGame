//Global variables definition
const cardsArray = [{src: './images/bobrossparrot.gif', name: 'Bob-Ross-Parrot'},
    {src: './images/bobrossparrot.gif', name: 'Bob-Ross-Parrot'},
    {src: './images/explodyparrot.gif', name: 'Explody-Parrot'},
    {src: './images/explodyparrot.gif', name: 'Explody-Parrot'},
    {src: './images/fiestaparrot.gif', name: 'Fiesta-Parrot'},
    {src: './images/fiestaparrot.gif',name: 'Fiesta-Parrot'},
    {src: './images/metalparrot.gif', name: 'Metal-Parrot'},
    {src: './images/metalparrot.gif', name: 'Metal-Parrot'},
    {src: './images/revertitparrot.gif', name: 'Revertit-Parrot'},    
    {src: './images/revertitparrot.gif', name: 'Revertit-Parrot'},
    {src: './images/tripletsparrot.gif', name: 'Triplets-Parrot'},
    {src: './images/tripletsparrot.gif', name: 'Triplets-Parrot'},
    {src: './images/unicornparrot.gif', name: 'Unicorn-Parrot'},
    {src: './images/unicornparrot.gif', name: 'Unicorn-Parrot'}
];

let firstCard;
let secondCard;

function comparator() {                 //Shuffle cards
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
            const memoryCard = gameArray[i];
            addCard.innerHTML += `
            <li class="card" title=${memoryCard.name} onclick="flipCard(this)">
                <img src=${memoryCard.src} class="back-face">
                <img src="./images/front.png" class="front-face">
            </li>`
        }
    } else {
        alert("Quantidade inválida!")
        setUpGame();   
    }
}

function unflipCard () {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    firstCard = null;
    secondCard = null;
}

function flipCard(card) {
    let flippedCard = document.querySelector(".flip");

    card.classList.add("flip");

    if (flippedCard === null) {
        firstCard = card;
    } else {
        secondCard = card;
    }

    if (firstCard.title === secondCard.title) {
        firstCard.classList.add("right-pair");
        firstCard.classList.remove("flip");
        secondCard.classList.add("right-pair");
        secondCard.classList.remove("flip");

        firstCard = null;
        secondCard = null;

    } else {
        setTimeout(unflipCard, 1000);        
    }
    console.log(firstCard, secondCard);
}

setUpGame();