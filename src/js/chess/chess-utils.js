import { cols, white, } from './chess-const.js'

function parseConfig(config){
    return  {
        flip: ('flip' in config) ? config.flip : false,
        asIcon: ('asIcon' in config) ? config.asIcon : true,
        asLines: ('asLines' in config) ? config.asLines : true,
        withLimitation: ('withLimitation' in config) ? config.withLimitation : false,
    }
}

function changeHistoryWithFen( fen ){
    const url = getAbsoluteRouteWithFen(fen);
    history.pushState({
        id: 'game-move'
    }, '', url);
}

function getAbsoluteRouteWithFen(fen){
     return  `${window.location.origin}${window.location.pathname}?fen=${fen}`;
}

function getCellKey(colLetter, rowNumber) {
    return `${colLetter}${rowNumber}`;
}

function createSquaresMap(rows, cols) {
    const listCells = [];
    rows.forEach((row) => {
        cols.forEach((col) => {
            const cellKey = getCellKey(col, row);
            listCells.push([cellKey, null]);
        })
    })
    return new Map(listCells);
}

function createMarkersMap(rows, cols) {
    const listCells = [];
    rows.forEach((row) => {
        cols.forEach((col) => {
            const cellKey = getCellKey(col, row);
            listCells.push([cellKey, []]);
        })
    })
    return new Map(listCells);
}


function asSquare(letter, color = white) {
    if (letter) {
        return {
            letter: letter,
            color: color,
        };
    } else {
        return null
    }

}

function parseMapToFenStr(squaresMap) {
    const rows = [8, 7, 6, 5, 4, 3, 2, 1];
    const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    let fenSquarePositions = '';

    let emptyAccumulator = 0;

    rows.forEach((row, rowIdx) => {
        emptyAccumulator = 0;
        cols.forEach((col) => {
            const squareName = getCellKey(col, row);
            const squarePiece = squaresMap.get(squareName)

            if (squarePiece) {
                if (emptyAccumulator !== 0) {
                    fenSquarePositions += emptyAccumulator.toString();
                    emptyAccumulator = 0;
                }
                const pieceLetter = squarePiece.color ? squarePiece.letter.toUpperCase() : squarePiece.letter.toLowerCase()
                fenSquarePositions += pieceLetter;

            } else {
                emptyAccumulator += 1;
            }

        })
        if (emptyAccumulator !== 0) {
            fenSquarePositions += emptyAccumulator.toString();
        }
        if (rowIdx < rows.length - 1) {
            fenSquarePositions += '/';
        }

    })
    const fen = `${fenSquarePositions} w KQkq - 0 1`;
    return fen;
}

function parseFenStrToObject(fen) {

    const squaresKeyVal = {};
    const allowedLetters = ['r', 'n', 'b', 'k', 'q', 'p', 'R', 'N', 'B', 'K', 'Q', 'P'];
    const fenFiguresSeparator = ' ';
    const fenRowsSeparator = '/';

    const figuresPart = fen.split(fenFiguresSeparator)[0];
    const strRows = figuresPart.split(fenRowsSeparator);

    strRows.forEach((rowText, rowIdw) => {
        const boardRowIdx = 8 - rowIdw; // to flip the board ->  rowIdw + 1
        let currentCol = 1;
        rowText.split('').forEach((character) => {
            if (allowedLetters.includes(character)) {
                // it´s a figure letter
                const colLetter = cols[currentCol - 1];
                const cellKey = getCellKey(colLetter, boardRowIdx);
                const color = (character == character.toUpperCase()); // R -> true
                const figureLetter = character.toLowerCase();
                squaresKeyVal[cellKey] = asSquare(figureLetter, color);
                currentCol += 1;

            } else {
                // should be a number
                const jumpCols = parseInt(character, 10)
                for (let c = currentCol; c < jumpCols + currentCol; c++) {
                    const colLetter = cols[c - 1];
                    const cellKey = getCellKey(colLetter, boardRowIdx);
                    squaresKeyVal[cellKey] = null;
                }
                currentCol += parseInt(character, 10);
            }
        })
    });
    return squaresKeyVal;
}

function parsePgn(pgnStr){
    const str = `
        [Event "IBM Kasparov vs. Deep Blue Rematch"]
        [Site "New York, NY USA"]
        [Date "1997.05.11"]
        [Round "6"]
        [White "Deep Blue"]
        [Black "Kasparov, Garry"]
        [Opening "Caro-Kann: 4...Nd7"]
        [ECO "B17"]
        [Result "1-0"]
         
        1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bd3 e6 7.N1f3 h6
        8.Nxe6 Qe7 9.O-O fxe6 10.Bg6+ Kd8 {Kasparov schüttelt kurz den Kopf}
        11.Bf4 b5 12.a4 Bb7 13.Re1 Nd5 14.Bg3 Kc8 15.axb5 cxb5 16.Qd3 Bc6
        17.Bf5 exf5 18.Rxe7 Bxe7 19.c4 1-0
    `;

    const regex = /([0-9]{1,2}.)([\S]+) ([\S]+)/gm;
    let m;

    const registry = [];

    while ((m = regex.exec(str)) !== null) {
        // avoid infinite loops
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        /*
         group 0: 16.Qd3 Bc6
         group 1: 16.
         group 2: Qd3
         group 3: Bc6
        */
        m.forEach((match, groupIndex) => {
            // console.debug(`[UTILS] parsePgn match: , group ${groupIndex}: ${match}`);
            if(groupIndex === 0){
                // Index move
            }
            if(groupIndex === 2){
                // Whites move
                registry.push(match);
            }
            if(groupIndex === 3){
                // Blacks move
                registry.push(match);
            }
        });
    }

    console.log( registry )
}


function pgnMoveParser( pgnMove){
    /*
    * b4!
    * Sf5!?
    * Nxf6
    * O-O
    * O-O-O
    * exd5
    * Bc5
    * Qd2#
    * g8=Q
    * Rf7+
    * Qh8+
    * Rcc8
    * */

    return ';'
}


export default {
    getCellKey,
    createSquaresMap,
    createMarkersMap,
    parseFenStrToObject,
    parseMapToFenStr,
    asSquare,
    parseConfig,
    getAbsoluteRouteWithFen,
    changeHistoryWithFen,
    parsePgn
}
