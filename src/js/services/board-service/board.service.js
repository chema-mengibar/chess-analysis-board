import SquareUtils from '../../utils/square.utils.js';
import ServiceUtils from './board-service.utils.js';

import { rows, cols, white, fenBase } from '../../utils/chess.constants.js';

export default class BoardService {

    constructor(config = null) {
        this.moves = [];
        this.moveIdx = 0;

        this.state = {
            move: null
        }

        if (config && 'fen' in config && config.fen) {
            this.init(config.fen);
        } else {
            this.createSquaresMap(rows, cols);
        }
    }

    init(fen = fenBase) {
        this.setFenToSquareMap(fen)
        this.movesReset()
        this.moveSave()
    }

    clear() {
        this.createSquaresMap(rows, cols);
        this.movesReset()
    }


    // Square Map 

    createSquaresMap(rows, cols) {
        const listSquares = [];
        rows.forEach((row) => {
            cols.forEach((col) => {
                const squareKey = SquareUtils.getSquareName(col, row);
                listSquares.push([squareKey, null]);
            })
        })
        this._squaresMap = new Map(listSquares);
    }

    getSquareMapAsFen() {
        return ServiceUtils.convertSquareMapToFenStr(this.getSquaresMap());
    }

    setFenToSquareMap(fen) {
        const resultMap = ServiceUtils.fenToMap(fen)
        this.setSquaresMap(resultMap);
    }

    getSquaresMap() {
        return this._squaresMap;
    }

    setSquaresMap(map) {
        this._squaresMap = map;
    }


    // Moves State 

    setMoveState(originSquare, targetSquare) {
        this.state.move = {
            from: originSquare,
            to: targetSquare,
        };
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
            return true;
        }
    }

    // Moves Registry

    movesReset() {
        this.moveIdx = 0;
        this.moves.length = this.moveIdx;
        this.state = {
            move: null
        }
    }

    moveSave() {
        const squareFrom = this.state.move ? this.state.move.from : null;
        const squareTo = this.state.move ? this.state.move.to : null;

        const moveEntry = {
            from: squareFrom,
            to: squareTo,
            fen: this.getSquareMapAsFen()
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

    moveNext() {
        let cursor = this.moveIdx + 1;
        if (cursor >= this.moves.length) {
            cursor = this.moves.length - 1;
        }
        this.moveIdx = cursor;
        const move = this.moves[cursor];
        if (!move) {
            return;
        }

        this.setFenToSquareMap(move.fen);
    }

    movePrev() {
        let cursor = this.moveIdx - 1;
        if (cursor <= 0) {
            cursor = 0;
        }
        this.moveIdx = cursor;
        const move = this.moves[cursor];
        if (!move) {
            return;
        }

        this.setFenToSquareMap(move.fen);
    }

    getMoveByIdx(moveIdx) {
        if (moveIdx < this.moves.length) {
            return this.moves[this.moveIdx];
        }
        return null;
    }

    // todo:feature
    // movesGoTo(gameMoveIdx = 1, color = white) {
    //     const cursor = (gameMoveIdx * 2) - (color ? 2 : 1) + 1; // +1, fix, because the initial position counts like a move
    //     this.moveIdx = cursor;
    //     return this.moves[cursor];
    // }

}