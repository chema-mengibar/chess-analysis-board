import SquareUtils from '../../utils/square.utils.js';
import UrlUtils from '../../utils/url.js';
import { white } from '../../utils/chess.constants.js';
import GameExportUtils from './game-export.utils.js';

export default class GameExportService {

    constructor(config, services) {
        this.config = config
        this.boardService = services.boardService
        this.analysisService = services.analysisService
    }


    createBoardLink() {
        const currentFen = this.boardService.getSquareMapAsFen()
        const linkHref = UrlUtils.getAbsoluteRouteWithFen(currentFen);
        GameExportUtils.addTextToClipboard(linkHref);
    }

    loadFenFromInput() {
        const fenInputStr = document.getElementById("fen-input").value;
        if (fenInputStr) {
            this.boardService.setFenToSquareMap(fenInputStr)
        }
    }

    loadFenToInput() {
        const currentFen = this.boardService.getSquareMapAsFen();
        document.getElementById("fen-input").value = currentFen;
    }

    loadPgnFromInput() {
        // todo: pgn
        const pgnInputStr = document.getElementById("pgn-input").value;
        this.renderPgnToBoard(pgnInputStr);
    }

    renderPgnToBoard(pgnInputStr) { // todo: pgn
        const notations = GameExportUtils.parsePgn(pgnInputStr);
        const squaresMap = this.boardService.getSquaresMap();
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
                    squaresMap.forEach((squareValue, squareKey) => {
                        if (!flag && squareFrom === squareKey) {
                            // Like in boardService.move(), maybe use it
                            this.boardService.setFigureInSquare(squareTo, figure, color);
                            this.boardService.setFigureInSquare(squareFrom, null);
                            this.boardService.setMoveState(squareFrom, squareTo);
                            this.boardService.moveSave();
                            flag = true;
                        } else if (!flag && squareValue && squareValue.color === color && squareValue.letter === figure) {
                            const options = this.analysisService.getSquarePieceAllowedSquares(squareKey, null, true);
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

                                const figureToSet = figureToChange || figure;
                                // Almost the same as above, todo: dry
                                this.boardService.setFigureInSquare(squareTo, figureToSet, color);
                                this.boardService.setFigureInSquare(squareKey, null);
                                this.boardService.setMoveState(squareKey, squareTo);
                                this.boardService.moveSave();
                                flag = true;
                            }
                        }
                    })

                })
            })

        } catch (error) {
            console.error('[PGN PARSER] error', error);
        }

    }

}