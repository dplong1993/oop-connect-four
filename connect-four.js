import Game from './game.js'
import GameJsonSerializer from './game-json-serializer.js'
import GameJsonDeserializer from './game-json-deserializer.js';

let game = undefined;
let serializer = undefined;
let deserializer = undefined;

const clearLocalStorage = () => {
  localStorage.removeItem('game-status');
  localStorage.removeItem('player-one-name');
  localStorage.removeItem('player-two-name');
};

const updateUi = () => {
    if (game === undefined) {
        document.getElementById("board-holder").classList.add("is-invisible");
    } else {
        document.getElementById("board-holder").classList.remove("is-invisible");
        document.getElementById("game-name").innerHTML = game.getName();
        console.log(game.winnerNumber);
        if(game.winnerNumber !== 0){
            console.log("Game Over");
            //TODO ASK A QUESTION ABOUT WHY THIS DOES NOT CLEAR
            //LOCAL STORAGE IMMEDIATELY.
            clearLocalStorage();
            document.getElementById('new-game').removeAttribute('disabled');
        }
        const currentplayer = game.currentplayer;
        const ctarget = document.getElementById("click-targets");
        if (currentplayer === 1) {
            ctarget.classList.remove('red');
            ctarget.classList.add('black');
            debugger
        } else {
            ctarget.classList.remove('black');
            ctarget.classList.add('red');
            debugger
        }
    }

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            const element = document.getElementById(`square-${i}-${j}`);
            const tokenvalue = game.getTokenAt(i,j);
            element.innerHTML = "";
            debugger
            if (tokenvalue === 1) {
                debugger
                const ele = document.createElement('div');
                ele.classList.add('token');
                ele.classList.add('black');
                element.appendChild(ele);
                debugger

            } else if (tokenvalue === 2) {
                debugger
                const ele = document.createElement('div');
                ele.classList.add('token');
                ele.classList.add('red');
                element.appendChild(ele);
                debugger
            }
        }
    }

    for(let i = 0; i < 7; i++){
      const col = document.getElementById(`column-${i}`);
      if(game.isColumnFull(i)) {
        // console.log(i);
        col.classList.add('full');
      } else {
        col.classList.remove('full');
      }
    }
};

window.addEventListener('DOMContentLoaded', (e) => {
    const p1name = document.getElementById("player-1-name");
    const p2name = document.getElementById("player-2-name");
    const ngame = document.getElementById("new-game");
    const nameformholder = document.getElementById("form-holder");
    const ctarget = document.getElementById("click-targets");

    //check local to see if game is in progress
    let gameStatus = localStorage.getItem('game-status');
    if(gameStatus){
      deserializer = new GameJsonDeserializer('game-status');
      game = deserializer.deserialize();
      serializer = new GameJsonSerializer(game);
      updateUi();
    }


    nameformholder.addEventListener('keyup', e => {
        const name1 = p1name.value;
        const name2 = p2name.value;
        if (p2name.value !== "" && p1name.value !== "") {
           ngame.removeAttribute('disabled');
        } else {
            ngame.disabled = true;
        }
    });



    ngame.addEventListener('click', e => {
        game = new Game(p1name.value, p2name.value);
        p1name.value = "";
        p2name.value = '';
        ngame.setAttribute('disabled', true);

        updateUi();

        serializer = new GameJsonSerializer(game);
        serializer.serialize();
    });

    ctarget.addEventListener('click', e => {
        const clicker = e.target.id;
        if (clicker.startsWith("column-") && !(e.target.classList.contains('full'))) {
            const lastchar = Number.parseInt(clicker[clicker.length - 1]);
            game.playInColumn(lastchar);

            updateUi();

            //Update the local storage
            serializer.serialize();
        }
    });
});
