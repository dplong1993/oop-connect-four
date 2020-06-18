import Game from './game.js'

let game = undefined;

const updateUi = () => {
    if (game === undefined) {
        document.getElementById("board-holder").classList.add("is-invisible");
    } else {
        document.getElementById("board-holder").classList.remove("is-invisible");
        document.getElementById("game-name").innerHTML = game.getName();
        const currentplayer = game.currentplayer;
        debugger
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
        console.log(i);
        col.classList.add('full');
      } else {
        col.classList.remove('full');
      }
    }
}

window.addEventListener('DOMContentLoaded', (e) => {
    const p1name = document.getElementById("player-1-name");
    const p2name = document.getElementById("player-2-name");
    const ngame = document.getElementById("new-game");
    const nameformholder = document.getElementById("form-holder");
    const ctarget = document.getElementById("click-targets");

    nameformholder.addEventListener('keyup', e => {
        const name1 = p1name.value;
        const name2 = p2name.value;
        //debugger
        if (p2name.value !== "" && p1name.value !== "") {
           ngame.removeAttribute('disabled');
           //debugger
        } else {
            ngame.disabled = true;
            //debugger
        }
    });



    ngame.addEventListener('click', e => {
        game = new Game(p1name.value, p2name.value);
        p1name.value = "";
        p2name.value = '';
        ngame.setAttribute('disabled', true);
        updateUi();

    })

    ctarget.addEventListener('click', e => {
        // debugger
        console.log('clicked');
        const clicker = e.target.id;
        if (clicker.startsWith("column-")) {
            const lastchar = Number.parseInt(clicker[clicker.length - 1]);
            game.playInColumn(lastchar);
        // debugger
            updateUi();
        // debugger
        }
    })





})
