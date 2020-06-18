import Column from './column.js'

export default class Game{
  constructor(p1Name, p2Name){
    this.p1Name = p1Name;
    this.p2Name = p2Name;
    this.currentplayer = 1;
    this.columns = [];

    for(let i = 0; i < 7; i++){
      this.columns.push(new Column());
    }
  }

  getName(){
    return `${this.p1Name} vs. ${this.p2Name}`;
  }

  getTokenAt(rowIndex, columnIndex){
    return this.columns[columnIndex].getTokenAt(rowIndex);
  }

  isColumnFull(columnIndex){
    return this.columns[columnIndex].isFull();
  }

  playInColumn(columnIndex) {
      this.columns[columnIndex].add(this.currentplayer);

      //debugger
      if (this.currentplayer === 1) {
          this.currentplayer = 2;
          //debugger
      } else {
          this.currentplayer = 1;
          //debugger
      }

  }


}
