import SquareUtils from '../../utils/square.utils.js';
import { rows, cols, white } from '../../utils/chess.constants.js';
import GameExportUtils from './game-export.utils.js';

export default class GameExportService {

    constructor(config) {

    }

    changeHistoryWithFen(fen) {
        const url = this.getAbsoluteRouteWithFen(fen);
        history.pushState({
            id: 'game-move'
        }, '', url);
    }

    getAbsoluteRouteWithFen(fen) {
        const fenQuery = fen ? `?fen=${fen}` : '';
        return `${window.location.origin}${window.location.pathname}${fenQuery}`;
    }

    convertSquareMapToFenStr(squaresMap) {
        const rows = [8, 7, 6, 5, 4, 3, 2, 1];
        const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

        let fenSquarePositions = '';

        let emptyAccumulator = 0;

        rows.forEach((row, rowIdx) => {
            emptyAccumulator = 0;
            cols.forEach((col) => {
                const squareName = SquareUtils.getSquareName(col, row);
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


    convertFenStrToObject(fen) {

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
                    const cellKey = SquareUtils.getSquareName(colLetter, boardRowIdx);
                    const color = (character == character.toUpperCase()); // R -> true
                    const figureLetter = character.toLowerCase();
                    squaresKeyVal[cellKey] = SquareUtils.asMapSquare(figureLetter, color);
                    currentCol += 1;

                } else {
                    // should be a number
                    const jumpCols = parseInt(character, 10)
                    for (let c = currentCol; c < jumpCols + currentCol; c++) {
                        const colLetter = cols[c - 1];
                        const cellKey = SquareUtils.getSquareName(colLetter, boardRowIdx);
                        squaresKeyVal[cellKey] = null;
                    }
                    currentCol += parseInt(character, 10);
                }
            })
        });
        return squaresKeyVal;
    }

    fenToMap(fen) {
        if (!fen || fen === '') {
            return
        }
        const fenAsObj = this.convertFenStrToObject(fen);
        return new Map(Object.entries(fenAsObj));
    }

    loadFenFromInput() {
        const fenInputStr = document.getElementById("fen-input").value;
        this.changeHistoryWithFen(fenInputStr);
        return this.fenToMap(fenInputStr);
    }

    loadFenToInput(squaresMap) {
        const currentFen = this.convertSquareMapToFenStr(squaresMap);
        this.changeHistoryWithFen(currentFen);
        document.getElementById("fen-input").value = currentFen;
    }

    loadPgnFromInput(squaresMap) {
        const pgnInputStr = document.getElementById("pgn-input").value;
        this.renderPgnToBoard(pgnInputStr, squaresMap);
    }

    renderPgnToBoard(pgnInputStr, squaresMap) {
        const notations = GameExportUtils.parsePgn(pgnInputStr);

        let cursorColor = white;
        const r = [];
        try {
            notations.forEach(notation => {
                const notationParts = GameExportUtils.parsePgnNotation(notation, cursorColor);
                cursorColor = !cursorColor;
                r.push(notationParts)
            });
            r.forEach(rItems => {
                rItems.forEach(rItem => {
                    const { figure, figureToChange, squareFrom, squareTo, color, capture } = rItem;
                    let flag = false;
                    //todo:refactor -> acces to squareMap 
                    squaresMap.forEach((squareValue, squareKey) => {
                        if (!flag && squareFrom === squareKey) {
                            // this.setFigureInSquare(squareTo, figure, color);
                            // this.setFigureInSquare(squareFrom, null);
                            // this.setMoveState(squareFrom, squareTo);
                            // this.record();
                            flag = true;
                        } else if (!flag && squareValue && squareValue.color === color && squareValue.letter === figure) {
                            const options = this.getSquarePieceAllowedSquares(squareKey, null, true);
                            if (options.includes(squareTo)) {
                                //jump if move from not contain notation origin square letter-col/row-number
                                if (squareFrom && !squareKey.includes(squareFrom)) {
                                    return;
                                }
                                // check rItem.capture for Pawns, if false, should be same column option square
                                // also jump
                                if (figure === 'p') {
                                    const keyCol = squareKey.split('')[0];
                                    const squareToCol = squareTo.split('')[0];
                                    if (!capture && keyCol !== squareToCol) {
                                        return
                                    }
                                }

                                const figureToSet = figureToChange || figure
                                    // this.setFigureInSquare(squareKey, null);
                                    // this.setFigureInSquare(squareTo, figureToSet, color);
                                    // this.setMoveState(squareKey, squareTo);
                                    // this.record();
                                flag = true;
                            }
                        }
                    })

                })
            })

            this.drawPiecesFromMap();
        } catch (error) {
            console.error('[PGN PARSER] error', error);
        }

    }

}