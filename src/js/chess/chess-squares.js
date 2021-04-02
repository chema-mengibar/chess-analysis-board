import { cols } from './chess-const.js';
import Utils from './chess-utils.js';


function getSquaresOptionsFromSquareWithR(
    squaresMap,
    squareColumLetter,
    squareRowNumber,
    limitation = false
) {
    const currentColumnIdx = cols.indexOf(squareColumLetter);
    const squares = [];
    for (let y = squareRowNumber - 1; y >= 1; y--) {
        squares.push(Utils.getCellKey(squareColumLetter, y));
        const lastSquare = squares[squares.length - 1];
        if (squaresMap.get(lastSquare) && limitation) {
            break;
        }
    }
    for (let y = squareRowNumber + 1; y <= 8; y++) {
        squares.push(Utils.getCellKey(squareColumLetter, y));
        const lastSquare = squares[squares.length - 1];
        if (squaresMap.get(lastSquare) && limitation) {
            break;
        }
    }
    for (let x = currentColumnIdx + 1; x < cols.length; x++) {
        squares.push(Utils.getCellKey(cols[x], squareRowNumber));
        const lastSquare = squares[squares.length - 1];
        if (squaresMap.get(lastSquare) && limitation) {
            break;
        }
    }
    for (let x = currentColumnIdx - 1; x >= 0; x--) {
        squares.push(Utils.getCellKey(cols[x], squareRowNumber));
        const lastSquare = squares[squares.length - 1];
        if (squaresMap.get(lastSquare) && limitation) {
            break;
        }
    }
    return squares;
}


function getSquaresOptionsFromSquareWithN(
    squareColumLetter,
    squareRowNumber
) {
    const currentColumnIdx = cols.indexOf(squareColumLetter);
    const squares = [];
    const nCombisYX = [
        [2, 1],
        [1, 2],
        [-1, 2],
        [-2, 1],
        [-2, -1],
        [-1, -2],
        [1, -2],
        [2, -1],
    ];
    nCombisYX.forEach((yx) => {
        const y = squareRowNumber + yx[0];
        const x = currentColumnIdx + yx[1];
        if (x >= 0 && x < cols.length && y > 0 && y <= 8) {
            squares.push(Utils.getCellKey(cols[x], y));
        }
    })
    return squares;
}


function getSquaresOptionsFromSquareWithP(
    squareColumLetter,
    squareRowNumber,
    color,
    allowPawnMove
) {
    const currentColumnIdx = cols.indexOf(squareColumLetter);
    const squares = [];
    const cellY = color ? squareRowNumber + 1 : squareRowNumber - 1;
    const pCombis = [
        [1, cellY],
        [-1, cellY]
    ];
    if (allowPawnMove) {
        pCombis.push([0, cellY]);
        const cellYplus2 = color ? squareRowNumber + 2 : squareRowNumber - 2;
        pCombis.push([0, cellYplus2]);
    }
    pCombis.forEach((xy) => {
        const x = currentColumnIdx + xy[0];
        const y = xy[1];
        if (x >= 0 && x < cols.length && y > 0 && y <= 8) {
            squares.push(Utils.getCellKey(cols[x], y));
        }
    });
    return squares;
}


function getSquaresOptionsFromSquareWithB(
    squaresMap,
    squareColumLetter,
    squareRowNumber,
    limitation = false
) {
    const currentColumnIdx = cols.indexOf(squareColumLetter);
    const squares = [];

    let xInc = 1;
    for (let y = squareRowNumber - 1; y >= 0; y--) {
        const x = currentColumnIdx + xInc;
        if (x >= 0 && x < cols.length && y > 0 && y <= 8) {

            squares.push(Utils.getCellKey(cols[x], y))
            xInc++;
            const lastSquare = squares[squares.length - 1];
            if (squaresMap.get(lastSquare) && limitation) {
                break;
            }
        }
    }

    xInc = 1;
    for (let y = squareRowNumber - 1; y >= 0; y--) {
        const x = currentColumnIdx - xInc;
        if (x >= 0 && x < cols.length && y > 0 && y <= 8) {
            squares.push(Utils.getCellKey(cols[x], y))
            xInc++;
            const lastSquare = squares[squares.length - 1];
            if (squaresMap.get(lastSquare) && limitation) {
                break;
            }
        }
    }

    xInc = 1;
    for (let y = squareRowNumber + 1; y <= 8; y++) {
        const x = currentColumnIdx - xInc;
        if (x >= 0 && x < cols.length && y > 0 && y <= 8) {

            squares.push(Utils.getCellKey(cols[x], y))
            xInc++;
            const lastSquare = squares[squares.length - 1];
            if (squaresMap.get(lastSquare) && limitation) {
                break;
            }
        }
    }

    xInc = 1;
    for (let y = squareRowNumber + 1; y <= 8; y++) {
        const x = currentColumnIdx + xInc;
        if (x >= 0 && x < cols.length && y > 0 && y <= 8) {
            squares.push(Utils.getCellKey(cols[x], y))
            xInc++;
            const lastSquare = squares[squares.length - 1];
            if (squaresMap.get(lastSquare) && limitation) {
                break;
            }
        }
    }
    return squares;
}


function getSquaresOptionsFromSquareWithK(
    squareColumLetter,
    squareRowNumber,
) {
    const currentColumnIdx = cols.indexOf(squareColumLetter);
    const squares = [];
    const kCombisXY = [
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
    ];
    kCombisXY.forEach((xy) => {
        const x = currentColumnIdx + xy[0];
        const y = squareRowNumber + xy[1];
        if (x >= 0 && x < cols.length && y > 0 && y <= 8) {
            squares.push(Utils.getCellKey(cols[x], y))
        }
    });
    return squares;
}

export default {
    getSquaresOptionsFromSquareWithR,
    getSquaresOptionsFromSquareWithN,
    getSquaresOptionsFromSquareWithP,
    getSquaresOptionsFromSquareWithB,
    getSquaresOptionsFromSquareWithK
}