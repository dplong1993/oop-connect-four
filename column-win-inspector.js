export default class ColumnWinInspector {
    constructor(column) {
        //console.log("Column passed into CWI is", column);
        this.column = column;
    }

    inspect () {
        for (let i = 5; i > 2; i--) {
            const playernumber = this.column.getTokenAt(i);
            //console.log("Current column is ", this.column, 'i is', i, "PlayerNum is", playernumber);
            if (playernumber !== 1 && playernumber !== 2) {
                return 0;
            } else if (playernumber === this.column.getTokenAt(i - 1)) {
                if (playernumber === this.column.getTokenAt(i - 2)) {
                    if (playernumber === this.column.getTokenAt(i-3)) {
                        return playernumber;
                    }
                }
            }
        }
        return 0;
    }
}
