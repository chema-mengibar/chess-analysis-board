import Utils from './chess/chess-utils.js';
import { white } from './chess/chess-const.js';

export default class MovesRegistry {

    constructor() {
        this.moves = [];
        this.moveIdx = 0;
    }

    reset() {
        this.moveIdx = 0;
        this.moves.length = this.moveIdx;
    }

    saveMove(squareFrom, squareTo, squaresMap) {
        const fen = Utils.parseMapToFenStr(squaresMap);
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

    get prevMove() {
        let cursor = this.moveIdx - 1;
        if (cursor <= 0) {
            cursor = 0;
        }
        this.moveIdx = cursor;
        return this.moves[cursor];
    }
    get nextMove() {
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

    goToGameMove(gameMoveIdx = 1, color = white) {
        const cursor = (gameMoveIdx * 2) - (color ? 2 : 1) + 1; // +1, fix, because the initial position counts like a move
        this.moveIdx = cursor;
        return this.moves[cursor];
    }

}