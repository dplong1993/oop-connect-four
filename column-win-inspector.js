export default class ColumnWinInspector {
    constructor(column) {
        console.log(column);
        this.column = column;
    }

    inspect () {
        for (let i = 0; i < 3; i++) {
            const playernumber = this.column[i];
            console.log(playernumber, i, i+1, i+2, i+3);
            if (playernumber !== 1 && playernumber !== 2) {
                console.log("Not a number");
                return 0;
            } else if (playernumber === this.column[i + 1]) {
                if (playernumber === this.column[i + 2]) {
                    if (playernumber === this.column[i + 3]) {
                        console.log("hi!");
                        return playernumber;
                    }
                }
            }
        }
        return 0;
    }
}
