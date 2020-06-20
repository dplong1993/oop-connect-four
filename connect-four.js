import Game from './game.js'
import GameJsonSerializer from './game-json-serializer.js'
import GameJsonDeserializer from './game-json-deserializer.js';

let game = undefined;
let serializer = undefined;
let deserializer = undefined;

window.addEventListener('DOMContentLoaded', (e) => {
    const p1name = document.getElementById("player-1-name");
    const p2name = document.getElementById("player-2-name");
    const ngame = document.getElementById("new-game");
    const nameformholder = document.getElementById("form-holder");
    const ctarget = document.getElementById("click-targets");

    //check local to see if game is in progress. If it is
    //load that game.
    let gameStatus = localStorage.getItem('game-status');
    if(gameStatus){
        loadGame();
    }

    nameformholder.addEventListener('keyup', e => {
        enableDisableNewGame();
    });

    ngame.addEventListener('click', e => {
        createGame(ngame, p1name, p2name);
        updateUi();

        //Create local storage for new game
        serializer = new GameJsonSerializer(game);
        serializer.serialize();
    });

    ctarget.addEventListener('click', e => {
        const clicker = e.target.id;

        //Check that the item clicked on is a token in a column that is not full
        if (clicker.startsWith("column-") && !(e.target.classList.contains('full'))) {
            //Get the column to play in and place a token in that column
            const lastchar = Number.parseInt(clicker[clicker.length - 1]);
            game.playInColumn(lastchar);

            updateUi();

            //Update the local storage
            serializer.serialize();
        }
    });
});

function updateUi() {
    //Handles the updates to the html which shows the board.
    if (game === undefined) {
        document.getElementById("board-holder").classList.add("is-invisible");
    } else {
        setUpBoard();
        isGameOver();
        changeTokenColor();
    }
    generateTokensInBoard();
    checkForFull();
}

function setUpBoard(){
    document.getElementById("board-holder").classList.remove("is-invisible");
    document.getElementById("game-name").innerHTML = game.getName();
}

function isGameOver(){
    if(game.winnerNumber !== 0){
        //TODO ASK A QUESTION ABOUT WHY THIS DOES NOT CLEAR
        //LOCAL STORAGE IMMEDIATELY.
        clearLocalStorage();
        document.getElementById('new-game').removeAttribute('disabled');
        document.getElementById('player-1-name').value = game.p1Name;
        document.getElementById('player-2-name').value = game.p2Name;
    }
}

function clearLocalStorage() {
  localStorage.removeItem('game-status');
  localStorage.removeItem('player-one-name');
  localStorage.removeItem('player-two-name');
}

function changeTokenColor(){
    const currentplayer = game.currentplayer;
    const ctarget = document.getElementById("click-targets");
    if (currentplayer === 1) {
        ctarget.classList.remove('red');
        ctarget.classList.add('black');
    } else {
        ctarget.classList.remove('black');
        ctarget.classList.add('red');
    }
}

function generateTokensInBoard() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            const tokenvalue = game.getTokenAt(i,j);
            createPlayedToken(tokenvalue, i, j);
        }
    }
}

function createPlayedToken(tokenvalue, rowNum, colNum){
    const element = document.getElementById(`square-${rowNum}-${colNum}`);
    const newChild = document.createElement('div');
    element.innerHTML = "";
    newChild.classList.add('token');
    if(tokenvalue === 1) newChild.classList.add('black');
    else if(tokenvalue === 2) newChild.classList.add('red');
    element.appendChild(newChild);
}

function checkForFull(){
    for(let i = 0; i < 7; i++){
        const col = document.getElementById(`column-${i}`);
        if(game.isColumnFull(i)) {
            col.classList.add('full');
        } else {
            col.classList.remove('full');
        }
    }
}

function loadGame(){
    deserializer = new GameJsonDeserializer('game-status');
    game = deserializer.deserialize();
    serializer = new GameJsonSerializer(game);
    updateUi();
}

function enableDisableNewGame(){
    const name1 = document.getElementById("player-1-name").value;
    const name2 = document.getElementById("player-2-name").value;
    if (name1 !== "" && name2 !== "") {
        document.getElementById("new-game").removeAttribute('disabled');
    } else {
        document.getElementById("new-game").disabled = true;
    }
}

function createGame(ngame, name1, name2){
    game = new Game(name1.value, name2.value);
    name1.value = "";
    name2.value = "";
    ngame.setAttribute('disabled', true);
}
