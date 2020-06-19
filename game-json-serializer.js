export default class GameJsonSerializer{
  constructor(game){
    console.log("In serializer constructor.")
    this.game = game;
  }

  serialize(){
    //build the data
    let currentIndexes = [5,5,5,5,5,5,5];
    let instructions = [];
    let valueToLookFor = 1;
    let columnIndex = 0;
    while(columnIndex < currentIndexes.length){
      console.log("CurrentIndexes", currentIndexes, "instructions", instructions, "value to look for", valueToLookFor, "columnIndex", columnIndex);
      let rowIndex = currentIndexes[columnIndex];
      let token = this.game.getTokenAt(rowIndex, columnIndex);
      if(token === valueToLookFor){
        console.log("Token is the value to look for");
        instructions.push(columnIndex);
        if(valueToLookFor === 1){
          valueToLookFor = 2;
        } else {
          valueToLookFor = 1;
        }
        currentIndexes[columnIndex]--;
        columnIndex = 0;
      }else {
        console.log("Token is not the value to look for");
        columnIndex++;
      }
    }

    //JSON.stringify the data
    instructions = JSON.stringify(instructions);

    //Return the string
    return instructions;
  }
}
