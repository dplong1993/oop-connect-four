import Game from "./game.js";

export default class GameJsonDeserializer{
  constructor(string){
    const p1name = JSON.parse(localStorage.getItem('player-one-name'));
    const p2name = JSON.parse(localStorage.getItem('player-two-name'));

    this.gameStatusArr = JSON.parse(localStorage.getItem(string));
    this.game = new Game(p1name, p2name)
  }

  deserialize(){
    for(let i = 0; i < this.gameStatusArr.length; i++){
      const column = this.gameStatusArr[i];
      this.game.playInColumn(column);
    }
    return this.game;
  }
}
