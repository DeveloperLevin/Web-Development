//selecting markup elements for manipulation
const btn = document.querySelector('.btn');
const box = Array.from(document.querySelectorAll('.box'));
const spaces = Array(9).fill(null);
const title = document.getElementsByClassName('title')[0];

//variable declarations
let o_text = "O";
let x_text = "X";
let curr_player = x_text;
let gameOn = true;

const start = () => {
    //add event listeners to all divs
    box.forEach((b) => {
        b.addEventListener('click', gameLogic)
    })
    
    //restart functionality
    btn.addEventListener('click', restart);
    function restart(e) {
        e.preventDefault();
        spaces.fill(null);
        box.forEach((b) => {
            b.innerText = " ";
        })
        title.innerText = "Tic Tac Toe";
        curr_player = x_text;
    }
    
    //sets the current player on the div and updates the corresponding array with the current player
    function gameLogic(e) {
        e.preventDefault();
        
        const id = e.target.id;
        const selectedBox = document.getElementById(id);
        //check if the array iws empty to avoid overriding of players
        if (!spaces[id - 1] && gameOn) {
            spaces[id-1] = curr_player;
            selectedBox.innerHTML = curr_player;

            //if player has won, display it and set game state to false so the user can select any more divs
            if(checkWinner(curr_player)){
                title.innerText = `${curr_player} has won`;
                gameOn = false;
            }

            //switches the value of the current player to the next player for the next event
            if (curr_player === x_text) { curr_player = o_text; }
            else { curr_player = x_text; }
        }
    }
    
    //function to check the game logic and identify a winner (parameter is the current player)
    function checkWinner(c) {
        if (spaces[0] === c && spaces[1] === c && spaces[2] === c){
            return true
        }
        if (spaces[3] === c && spaces[4] === c && spaces[5] === c){
            return true
        }
        if (spaces[6] === c && spaces[7] === c && spaces[8] === c){
            return true
        }
        if (spaces[0] === c && spaces[3] === c && spaces[6] === c){
            return true
        }
        if (spaces[1] === c && spaces[4] === c && spaces[7] === c){
            return true
        }
        if (spaces[2] === c && spaces[5] === c && spaces[8] === c){
            return true
        }
        if (spaces[0] === c && spaces[4] === c && spaces[8] === c){
            return true
        }
        if (spaces[2] === c && spaces[4] === c && spaces[6] === c){
            return true
        }
        return false
    }
    
}

//main function
start();