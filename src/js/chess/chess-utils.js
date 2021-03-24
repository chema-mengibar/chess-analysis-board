import { cols, white, } from './chess-const.js'


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
    const fen = fenSquarePositions
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





export default {
    getCellKey,
    createSquaresMap,
    createMarkersMap,
    parseFenStrToObject,
    parseMapToFenStr,
    asSquare
}