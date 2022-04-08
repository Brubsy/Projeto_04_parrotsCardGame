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

let allPaired = [];
let firstCard;
let secondCard;
let roundsTaken = 0;

//Shuffle cards
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

function flipCard(card) {
    let flippedCard = document.querySelector(".flip");
    card.classList.add("flip");

    if (flippedCard === null) {
        firstCard = card;
    } else {
        secondCard = card;
        roundsTaken++;
    }

    if (secondCard !== undefined) {
        matchCards(); 
    }
                  
    congratsPlayer();
}

function matchCards() {
    if (firstCard.title === secondCard.title) {
        setMatchedPair();
    } else {
        setTimeout(unflipCards, 1000);        
    }
}

function setMatchedPair() {
    firstCard.classList.add("right-pair");
    firstCard.classList.remove("flip");
    secondCard.classList.add("right-pair");
    secondCard.classList.remove("flip");
    allPaired = document.querySelectorAll(".right-pair");

    resetRound();
}

function unflipCards() {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetRound();
}

function resetRound() {
    firstCard = undefined;
    secondCard = undefined;
}

function congratulationsMessage() {
    alert(`Parabéns! Você ganhou em ${roundsTaken} jogadas!`);
}

function congratsPlayer() {
    let allCards = document.querySelectorAll("li");

    if (allPaired.length === allCards.length) {
        setTimeout(congratulationsMessage, 300);
        }
}

setUpGame();