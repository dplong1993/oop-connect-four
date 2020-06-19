export default class DiagonalWinInspector{
    constructor(columns){
      this.columns = columns;
    }

    inspect() {
        for (let i = 0; i < 3; i++) {
          const token1 = this.columns[0].getTokenAt(i);
          const token2 = this.columns[1].getTokenAt(i + 1);
          const token3 = this.columns[2].getTokenAt(i + 2);
          const token4 = this.columns[3].getTokenAt(i + 3);
          //console.log(token1, token2, token3, token4);
          if (token1 !== null && token1 === token2 && token1 === token3 && token1 === token4) {
              //console.log("Diagonal win!");
              return token1;
          }
          const token5 = this.columns[3].getTokenAt(i);
          const token6 = this.columns[2].getTokenAt(i + 1);
          const token7 = this.columns[1].getTokenAt(i + 2);
          const token8 = this.columns[0].getTokenAt(i + 3);
          //console.log(token5, token6, token7, token8);
          if (token5 !== null && token5 === token6 && token5 === token7 && token5 === token8) {
              //console.log("Diagonal win!");
              return token5;
          }
        }
        return 0;

    }
}
