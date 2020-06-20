export default class GameJsonSerializer{
  constructor(game){
    this.game = game;
  }

  serialize(){
    //build the data
    let currentIndexes = [5,5,5,5,5,5,5];
    let instructions = [];
    let valueToLookFor = 1;
    let columnIndex = 0;
    while(columnIndex < currentIndexes.length){
      let rowIndex = currentIndexes[columnIndex];
      let token = this.game.getTokenAt(rowIndex, columnIndex);
      if(token === valueToLookFor){
        instructions.push(columnIndex);
        if(valueToLookFor === 1){
          valueToLookFor = 2;
        } else {
          valueToLookFor = 1;
        }
        currentIndexes[columnIndex]--;
        columnIndex = 0;
      }else {
        columnIndex++;
      }
    }

    //JSON.stringify the data, the game obj, and the player names
    instructions = JSON.stringify(instructions);
    let playerOneName = JSON.stringify(this.game.p1Name);
    let playerTwoName = JSON.stringify(this.game.p2Name);

    //Store the strings
    localStorage.setItem('player-one-name', playerOneName);
    localStorage.setItem('player-two-name', playerTwoName);
    localStorage.setItem('game-status', instructions);
  }
}
