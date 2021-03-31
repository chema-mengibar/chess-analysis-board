import { cols, white, black } from './chess-const.js'

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
         
        1.Nf3 e5 2.Ng5 1-0
    `;

    let m;
    const regex = /([0-9]{1,2}.)([\S]+) ([\S]+)/gm;
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
        console.log(m)
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

   return  registry;
}


function parsePgnNotation( pgnMove, color=white ){
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
    * end games: 1-0, ...
    * mate #
    * */

    const pgnMoveClean1 = pgnMove.replace('#','')
        .replace('+','')
        .replace('?','')
        .replace('!','');

    // endGame case
    if(['1-0', '1:0', '0-1', '0:1', '1/2-1/2', '*'].includes(pgnMoveClean1)){
        return [];
    }

    // Short halfMove case
    if(pgnMoveClean1 === 'O-O'){
        if(color === white ){

            return [
                {figure:'k', squareFrom:'e1', squareTo:'g1', color},
                {figure:'r',squareFrom:'h1', squareTo:'f1', color},
            ];
        }
        return [
            {figure:'k', squareFrom:'e8', squareTo:'g8', color},
            {figure:'r',squareFrom:'h8', squareTo:'f8', color},
        ];
    }

    // Long halfMove case
    if(pgnMoveClean1 === 'O-O-O'){
        if(color === white ){
            return [
                {figure:'k',  squareFrom:'e1', squareTo:'c1', color},
                {figure:'r', squareFrom:'a1',squareTo:'d1', color},
            ];
        }
        return [
            {figure:'k',  squareFrom:'e8', squareTo:'c8', color},
            {figure:'r', squareFrom:'a8',squareTo:'d8', color},
        ];
    }

    // Pawn promotion case: g8=Q
    if(pgnMoveClean1.indexOf('=' )> -1){
        const partsChange = pgnMoveClean1.split('=');
        return [
            {
                figure:partsChange[1].toLowerCase(),
                squareTo:partsChange[0], color
            },
        ];
    }

    const regExpSquare = /([a-z]{1}[0-9]{1})/g;
    const matchSquare = regExpSquare.exec(pgnMoveClean1);
    const pgnSquareName = matchSquare[1];
    const pgnMoveClean2 = pgnMoveClean1.replace(pgnSquareName, '');
    const pgnMoveCleanNoX = pgnMoveClean2.replace('x','');

    // Pawn case
    if(pgnMoveCleanNoX === pgnMoveCleanNoX.toLowerCase()){
        return [
            {
                figure:'p',
                squareFrom:pgnMoveCleanNoX,
                squareTo:pgnSquareName, color
            },
        ];
    }

    let squareFrom = '';
    let figure = '';
    if( pgnMoveCleanNoX.length === 2){
        squareFrom = pgnMoveCleanNoX[1];
        figure =  pgnMoveCleanNoX[0].toLowerCase();
    }
    else{
        figure =  pgnMoveCleanNoX.toLowerCase();
    }
    return [
        {
            figure:figure,
            squareFrom:squareFrom,
            squareTo:pgnSquareName,color

        },
    ];

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
    parsePgn,
    parsePgnNotation
}
