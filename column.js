export default class Column {
  constructor(){
    this.tokens = [];
    for(let i = 0; i < 6; i++){
      this.tokens.push(null);
    }
  }

  add(playerNum){
    //Zeroth position is the bottom of the column
    let i = 6;
    while(true){
    //TODO Add check to see if entire column is full
      if(this.tokens[i] === null){
        this.tokens[i] = playerNum;
        break;
      } else {
        i--;
      }
    }
  }

  isFull(){
    if(tokens[0] !== null) return true;
    else return false;
  }

  getTokenAt(rowIndexNum){
    if(this.tokens[rowIndexNum]) return this.tokens[rowIndexNum];
    else return null;
  }
}
