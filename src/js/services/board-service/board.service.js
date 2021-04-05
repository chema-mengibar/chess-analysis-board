import SquareUtils from '../../utils/square.utils.js';
import { rows, cols, white } from '../../utils/chess.constants.js';

export default class BoardService {

    constructor(config = null, services) {

        this.gameExportService = services.gameExportService;

        if (config && 'fen' in config) {
            this._squaresMap = this.gameExportService.fenToMap(config.fen);
        } else {
            this._squaresMap = this.createSquaresMap(rows, cols);
        }

        this.moves = [];
        this.moveIdx = 0;

        this.state = {
            move: null
        }

    }

    updateSquareMapFromMove(move) {
        this._squaresMap = this.gameExportService.fenToMap(move.fen);
        this.gameExportService.changeHistoryWithFen(move.fen)
    }


    getSquaresMap() {
        return this._squaresMap;
    }

    setMoveState(originSquare, targetSquare) {
        this.state.move = {
            from: originSquare,
            to: targetSquare,
        };
    }

    createSquaresMap(rows, cols) {
        const listSquares = [];
        rows.forEach((row) => {
            cols.forEach((col) => {
                const squareKey = SquareUtils.getSquareName(col, row);
                listSquares.push([squareKey, null]);
            })
        })
        return new Map(listSquares);
    }

    setFigureInSquare(squareName, letter, color = white) {
        this._squaresMap.set(squareName, SquareUtils.asMapSquare(letter, color));
    }

    async move(originSquare, targetSquare) {

        const originPiece = this._squaresMap.get(originSquare);
        if (originPiece) {
            this.setFigureInSquare(targetSquare, originPiece.letter, originPiece.color);
            this.setFigureInSquare(originSquare, null);
            this.setMoveState(originSquare, targetSquare);

            const currentFen = this.gameExportService.convertSquareMapToFenStr(this._squaresMap);
            this.gameExportService.changeHistoryWithFen(currentFen);

            // todo:refactor
            // this.drawPiecesFromMap();
            // // COM: RePaint domains on move
            // if (this.state.isDomainWhiteOn) {
            //     this.drawDomainByColor(white);
            // }
            // if (this.state.isDomainBlackOn) {
            //     this.drawDomainByColor(black);
            // }
            return true;
        }
    }

    movesReset() {
        this.moveIdx = 0;
        this.moves.length = this.moveIdx;
    }

    moveSave() {
        const squareFrom = this.state.move ? this.state.move.from : null;
        const squareTo = this.state.move ? this.state.move.to : null;

        const fen = this.gameExportService.convertSquareMapToFenStr(this._squaresMap);
        const moveEntry = {
            from: squareFrom,
            to: squareTo,
            fen: fen
        }

        const currentCursor = this.moveIdx;
        if (this.moves.length !== 0) {

            this.moves.length = currentCursor + 1;
        }
        this.moves.push(moveEntry);
        this.moveIdx = this.moves.length - 1;
    }

    get currentMoveIdx() {
        return this.moveIdx;
    }

    get currentMove() {
        return this.moves[this.moveIdx];
    }

    get movePrev() {
        let cursor = this.moveIdx - 1;
        if (cursor <= 0) {
            cursor = 0;
        }
        this.moveIdx = cursor;
        return this.moves[cursor];
    }

    get moveNext() {
        let cursor = this.moveIdx + 1;
        if (cursor >= this.moves.length) {
            cursor = this.moves.length - 1;
        }
        this.moveIdx = cursor;
        return this.moves[cursor];
    }

    getMoveByIdx(moveIdx) {
        if (moveIdx < this.moves.length) {
            return this.moves[this.moveIdx];
        }
        return null;
    }

    movesGoTo(gameMoveIdx = 1, color = white) {
        const cursor = (gameMoveIdx * 2) - (color ? 2 : 1) + 1; // +1, fix, because the initial position counts like a move
        this.moveIdx = cursor;
        return this.moves[cursor];
    }
}