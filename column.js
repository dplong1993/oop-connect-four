export default class Column {
  constructor(){
    this.tokens = new Array(6).fill(null);
  }

  add(playerNum){
    //Zeroth position is the bottom of the column
    let i = 6;
    while(i > -1){
      if(this.tokens[i] === null){
        this.tokens[i] = playerNum;
        break;
      } else i--;
    }
  }

  isFull(){
    if(this.tokens[0] !== null) return true;
    else return false;
  }

  getTokenAt(rowIndexNum){
    if(this.tokens[rowIndexNum]) return this.tokens[rowIndexNum];
    else return null;
  }
}
