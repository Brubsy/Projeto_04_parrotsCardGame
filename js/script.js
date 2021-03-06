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
let seconds = 0;
let minutes = 0;
let lockBoard = false;
let idInterval = setInterval(incrementSeconds, 1000);
const gameBoard = document.querySelector(".cards");
const timer = document.querySelector("span");

//Shuffle cards
function comparator() {                 
	return Math.random() - 0.5; 
}

function setUpGame() {
    seconds = 0;
    minutes = 0;
    roundsTaken = 0;
    const cardsQuantity = prompt("Com quantas cartas você quer jogar? (mín. 4 e máx. 14)");
    const gameArray = [];
    
    if (4 <= cardsQuantity && cardsQuantity<= 14 && cardsQuantity % 2 === 0) {
        for (let i = 0; i < cardsQuantity; i++) {
            gameArray[i] = cardsArray[i];
        }

        gameArray.sort(comparator);

        for (let i = 0; i < cardsQuantity; i++) {
            const memoryCard = gameArray[i];
            gameBoard.innerHTML += `
            <li class="card" data-card-type=${memoryCard.name} onclick="flipCard(this)">
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
    if (lockBoard) {
        return;
    }

    if (card === firstCard) {
        return;
    }

    let flippedCard = document.querySelector(".flip");
    card.classList.add("flip");

   if (flippedCard === null) {
        firstCard = card;
        roundsTaken++;
    } else {
        secondCard = card;
        roundsTaken++;
    }

    if (secondCard !== undefined) {
        matchCards(); 
    }

    console.log(gameBoard);
                  
    congratsPlayer();
}

function matchCards() {
    if (firstCard.dataset.cardType === secondCard.dataset.cardType) {
        setMatchedPair();
    } else {
        lockBoard = true;
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
    lockBoard = false;
}

function congratulationsMessage() {
    let timePassed = timer.innerText;

    if (timePassed.substring(0,1) !== "0") {
        alert(`Parabéns! Você ganhou em ${timePassed.substring(0,2)} minutos e ${timePassed.substring(3)} segundos com ${roundsTaken} jogadas!`);
    }

    if (timePassed.substring(0,1) === "0" && timePassed.substring(1,2) !== "0") {
        alert(`Parabéns! Você ganhou em ${timePassed.substring(1,2)} minutos e ${timePassed.substring(3)} segundos com ${roundsTaken} jogadas!`);
    }

    if (timePassed.substring(0,2) === "00") {
        alert(`Parabéns! Você ganhou em ${timePassed.substring(3)} segundos com ${roundsTaken} jogadas!`);
    }
}

function congratsPlayer() {
    let allCards = document.querySelectorAll("li");

    if (allPaired.length === allCards.length) {
        setTimeout(congratulationsMessage, 300);
        setTimeout(askRestartGame, 800);
        }
}

function askRestartGame() {
    let getRestartGame = prompt("Você quer reiniciar a partida?");

    if (getRestartGame === 'sim') {
        eraseBoard();
        setUpGame();
    } else {
        clearInterval(idInterval);
    }
}

function eraseBoard() {
    allPaired = [];
    
    while (gameBoard.firstChild) {
        gameBoard.firstElementChild.classList.remove("right-pair");
        gameBoard.removeChild(gameBoard.firstChild);
    }
}

function incrementSeconds() {
    seconds++;

    if (minutes > 9) {
        writeMinutesTwoDigits();
    } else {
        writeMinuteOneDigit();
    }
}

function writeMinutesTwoDigits() {
    if (seconds < 10) {
        timer.innerText = `${minutes}:0${seconds}`;
    }

    if (seconds >= 10) {
        timer.innerText = `${minutes}:${seconds}`;
    }

    if (seconds > 59) {
        minutes++;
        seconds = 0;
        timer.innerText = `${minutes}:0${seconds}`
    }
}

function writeMinuteOneDigit() {
    if (seconds >= 10) {
        timer.innerText = `0${minutes}:${seconds}`;
    }

    if (seconds < 10) {
        timer.innerText = `0${minutes}:0${seconds}`;
    }

    if (seconds > 59) {
        minutes++;
        seconds = 0;
        timer.innerText = `0${minutes}:0${seconds}`
    }    
}

setUpGame();