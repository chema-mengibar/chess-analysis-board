import { jest } from '@jest/globals';
import Squares from './chess-squares.js';


describe('Squares getSquaresOptionsFromSquareWithR', () => {
    it('should return the squares  options for a Square with a Rook piece in a1', () => {
        const resultSquares = Squares.getSquaresOptionsFromSquareWithR('a', 1);

        const expectedSquaresList = [
            'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
            'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
        ];
        expect(resultSquares).toEqual(expectedSquaresList);
    })

    it('should return the squares  options for a Square with a Rook piece in e4', () => {
        const resultSquares = Squares.getSquaresOptionsFromSquareWithR('e', 4);
        expect(resultSquares).toHaveLength(14);
    })
})