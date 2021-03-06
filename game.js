import Column from './column.js'
import ColumnWinInspector from './column-win-inspector.js'
import RowWinInspector from './row-win-inspector.js'
import DiagonalWinInspector from './diagonal-win-inspector.js'

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
    if (this.winnerNumber === 1) {
      return `${this.p1Name} wins!!!`;
    } else if(this.winnerNumber === 2) {
      return `${this.p2Name} wins!!!`;
    } else if(this.winnerNumber === 3){
      return `${this.p1Name} ties with ${this.p2Name}!!`;
    } else {
      return `${this.p1Name} vs. ${this.p2Name}`;
    }
  }

  getTokenAt(rowIndex, columnIndex){
    return this.columns[columnIndex].getTokenAt(rowIndex);
  }

  isColumnFull(columnIndex){
    if(this.winnerNumber > 0) return true;
    return this.columns[columnIndex].isFull();
  }

  playInColumn(columnIndex) {
      this.columns[columnIndex].add(this.currentplayer);

      this.changePlayer();

      if (this.checkForTie()) this.winnerNumber = 3;

      if (this.winnerNumber === 0){
        this.checkForColumnWin();
        this.checkForRowWin();
        this.checkForDiagWin();
      }
  }

  checkForTie() {
      let allFull = true;
      for (let i = 0; i < this.columns.length; i++) {
          allFull = this.columns[i].isFull();
          if (allFull === false) {
              return false
          }
      }
      return true;
  }

  checkForColumnWin(){
    for(let i = 0; i < this.columns.length; i++){
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
      const rowInspector = new RowWinInspector(this.columns.slice(i,i+4));
      const rowResult = rowInspector.inspect();
      if(rowResult > 0){
        this.winnerNumber = rowResult;
        break;
      }
    }
  }

  checkForDiagWin(){
    for (let i = 0; i < 4; i++) {
      const diagInspector = new DiagonalWinInspector(this.columns.slice(i,i+4));
      const diagResult = diagInspector.inspect();
      if(diagResult > 0){
        this.winnerNumber = diagResult;
        break;
      }
    }
  }

  changePlayer(){
    if (this.currentplayer === 1) this.currentplayer = 2;
    else this.currentplayer = 1;
  }
}
