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

        const currentCursor = this.moveIdx;
        this.moves.length= currentCursor + 1;
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
        console.log(this.moves)
        console.log(this.moveIdx)
        let cursor = this.moveIdx - 1;
        console.log(cursor)
        if( cursor <= 0){
            cursor = 0;
        }
       this.moveIdx = cursor;
       return this.moves[cursor];
    }
    get nextMove() {
        let cursor = this.moveIdx + 1;
        if( cursor >= this.moves.length){
            cursor = this.moves.length-1;
        }
        this.moveIdx = cursor;
        return this.moves[cursor ];
    }

    getMoveByIdx(moveIdx){
        if(moveIdx<this.moves.length){
            return this.moves[this.moveIdx];
        }
        return null;
    }


}
