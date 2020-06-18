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
    while(i > -1){
      if(this.tokens[i] === null){
        this.tokens[i] = playerNum;
        break;
      } else {
        i--;
      }
    }
  }

  isFull(){
    //debugger
    if(this.tokens[0] !== null) {
      //debugger
      return true;
    }
    else {
      //debugger
      return false;
    }
  }

  getTokenAt(rowIndexNum){
    //debugger
    if(this.tokens[rowIndexNum]) {
      //debugger
      return this.tokens[rowIndexNum];
    }
    else {
      //debugger
      return null;
    }
  }
}
