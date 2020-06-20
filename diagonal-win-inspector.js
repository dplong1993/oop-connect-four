export default class DiagonalWinInspector{
    constructor(columns){
      this.columns = columns;
    }

    inspect() {
        for (let i = 0; i < 3; i++) {
          const frontDiag = this.checkFrontDiag(i);
          const backDiag = this.checkBackDiag(i);
          if(frontDiag) return frontDiag;
          else if(backDiag) return backDiag;
        }
        return 0;

    }

    checkFrontDiag(index){
      const token1 = this.columns[0].getTokenAt(index);
      const token2 = this.columns[1].getTokenAt(index + 1);
      const token3 = this.columns[2].getTokenAt(index + 2);
      const token4 = this.columns[3].getTokenAt(index + 3);

      if (token1 !== null &&
          token1 === token2 &&
          token1 === token3 &&
          token1 === token4) return token1;
      else return null;
    }

    checkBackDiag(index){
      const token5 = this.columns[3].getTokenAt(index);
      const token6 = this.columns[2].getTokenAt(index + 1);
      const token7 = this.columns[1].getTokenAt(index + 2);
      const token8 = this.columns[0].getTokenAt(index + 3);

      if (token5 !== null &&
          token5 === token6 &&
          token5 === token7 &&
          token5 === token8) return token5;
      else return null;
    }
}
