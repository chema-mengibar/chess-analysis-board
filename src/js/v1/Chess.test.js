/**
 * @jest-environment jsdom
 */

import Chess from './Chess.js';
import Mock4 from './mocks/pgn-04.mocks';
import { white, black } from './chess/chess-const.js';

const configA = {
    asIcon: true,
    asLines: true,
    withLimitation: true,
    flip: false
};


const chess = new Chess(configA);

describe('renderPgnToBoard()', () => {

    it('should import pgn to board', () => {

        chess.renderPgnToBoard(Mock4);

        const resultMove = chess.movesRegistry.goToGameMove(13, black);
        expect(resultMove.from).toBe('d7');
    })
})