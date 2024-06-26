const userChoice = document.querySelector('.player');
const compChoice = document.querySelector('.computer');
const title = document.querySelector('.heading');

const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissor = document.querySelector('#scissor');

const availableChoices = {
    "rock" : "fa-regular fa-hand-back-fist",
    "paper" : "fa-regular fa-hand",
    "scissor" : "fa-regular fa-hand-scissors"
}

const keys = Object.keys(availableChoices);

function ComputedChoice () {
    const randomChoice = keys[Math.floor(Math.random() * 3)]

    compChoice.querySelector('p').innerText = randomChoice;
    compChoice.querySelector('i').classList = availableChoices[randomChoice];

    declareWinner()
}

function declareWinner() {
    const human = userChoice.querySelector('p').innerText;
    const machine = compChoice.querySelector('p').innerText;

    if (human === machine) {
        title.innerText = "It's a Draw";
    }
    else if (human === 'ROCK'){
        if (machine === 'PAPER') {
            title.innerText = "You Lose";
        }
        else {
            title.innerText = "You Win";
        }
    }
    else if (human === 'PAPER'){
        if (machine === 'SCISSOR') {
            title.innerText = "You Lose";
        }
        else {
            title.innerText = "You Win";
        }
    }
    else if (human === 'SCISSOR'){
        if (machine === 'ROCK') {
            title.innerText = "You Lose";
        }
        else {
            title.innerText = "You Win";
        }
    }
}

//event listeners
rock.addEventListener('click', (e) => {
    e.preventDefault();
    userChoice.querySelector('p').innerText = keys[0];
    userChoice.querySelector('i').classList = availableChoices.rock;

    ComputedChoice()
});

paper.addEventListener('click', (e) => {
    e.preventDefault();
    userChoice.querySelector('p').innerText = keys[1];
    userChoice.querySelector('i').classList = availableChoices.paper;

    ComputedChoice()
});

scissor.addEventListener('click', (e) => {
    e.preventDefault();
    userChoice.querySelector('p').innerText = keys[2];
    userChoice.querySelector('i').classList = availableChoices.scissor;

    ComputedChoice()
});