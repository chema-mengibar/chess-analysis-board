import Utils from './chess/chess-utils.js';

export default class MovesRegistry {

    constructor() {
        this.moves = [];
        this.moveIdx = 0;
    }

    saveMove(squareFrom, squareTo, squaresMap) {
        const fen = Utils.parseMapToFenStr(squaresMap);
        const moveEntry = {
            from: squareFrom,
            to: squareTo,
            fen: fen
        }
        this.moves.push(moveEntry);
        this.moveIdx = this.moves.length - 1;
    }

    get currentMoveIdx() {
        return this.moveIdx;
    }


}