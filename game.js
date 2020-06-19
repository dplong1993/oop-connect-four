import Column from './column.js'
import ColumnWinInspector from './column-win-inspector.js'
import RowWinInspector from './row-win-inspector.js'

export default class Game{
  constructor(p1Name, p2Name){
    this.p1Name = p1Name;
    this.p2Name = p2Name;
    this.currentplayer = 1;
    this.columns = [];
    this.winnerNumber = 0;

    for(let i = 0; i < 7; i++){
      this.columns.push(new Column());
    }
  }

  getName(){
    if (this.winnerNumber === 3) {
        return `${this.p1Name} ties with ${this.p2Name}!!`;
    } else if(this.winnerNumber > 0){
        if(this.winnerNumber === 1){
          return `${this.p1Name} wins!!!`;
        } else {
            return `${this.p2Name} wins!!!`;
        }
    } else {
        return `${this.p1Name} vs. ${this.p2Name}`;
    }
  }

  getTokenAt(rowIndex, columnIndex){
    debugger
    return this.columns[columnIndex].getTokenAt(rowIndex);
  }

  isColumnFull(columnIndex){
    if(this.winnerNumber > 0) return true;
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

      if (this.checkForTie()) {
          this.winnerNumber = 3;
      }

      if (this.winnerNumber === 0){
        const columnWinRes = this.checkForColumnWin();
        if (columnWinRes > 0){
          this.winnerNumber = columnWinRes;
        }
        const rowWinRes = this.checkForRowWin();
        if (rowWinRes > 0){
          this.winnerNumber = rowWinRes;
        }
      }
  }

  checkForTie() {
      let allFull = true;
      // debugger
      for (let i = 0; i < this.columns.length; i++) {
          // debugger
          allFull = this.columns[i].isFull();
          if (allFull === false) {
              return false
          }
      }
      return true;
  }

  checkForColumnWin(){
    for(let i = 0; i < this.columns.length; i++){
      //console.log(`Column ${i} is`, this.columns[i]);
      const columnInspector = new ColumnWinInspector(this.columns[i]);
      const columnRes = columnInspector.inspect();
      if(columnRes > 0){
        this.winnerNumber = columnRes;
        break;
      }
    }
  }

  checkForRowWin(){
    for (let i = 0; i < 4; i++) {
      // console.log(this.columns.slice(i, i+4));
      const rowInspector = new RowWinInspector(this.columns.slice(i,i+4));
      const rowResult = rowInspector.inspect();
      if(rowResult > 0){
        this.winnerNumber = rowResult;
        break;
      }
    }
  }
}
