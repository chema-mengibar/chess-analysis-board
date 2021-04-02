import Squares from './chess-squares.js';
import Utils from './chess-utils';
import { rows, cols, white, black } from './chess-const.js';


describe('Squares getSquaresOptionsFromSquareWithR', () => {

    it('should return the squares  options for a Square with a Rook piece in e4', () => {
        const mockSquareMap = Utils.createSquaresMap(rows, cols);
        const resultSquares = Squares.getSquaresOptionsFromSquareWithR(mockSquareMap, 'e', 4);
        expect(resultSquares).toHaveLength(14);
    });

    it('should return the squares  options for a Square with a Rook piece in e4 and a piece in square options and use limitatio param', () => {
        const mockSquareMap = Utils.createSquaresMap(rows, cols);
        mockSquareMap.set('e6', {});

        const resultSquares = Squares.getSquaresOptionsFromSquareWithR(mockSquareMap, 'e', 4, true);
        expect(resultSquares).toHaveLength(12);
    });

    it('should return the squares  options for a Square with a Rook piece in a1', () => {

        const mockSquareMap = Utils.createSquaresMap(rows, cols);
        const resultSquares = Squares.getSquaresOptionsFromSquareWithR(mockSquareMap, 'a', 1);

        const expectedSquaresList = [
            'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
            'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
        ];
        expect(resultSquares).toEqual(expectedSquaresList);
    });

})


describe('Squares getSquaresOptionsFromSquareWithN', () => {

    it('should return the allowed options for the first row b1', () => {
        const resultSquares = Squares.getSquaresOptionsFromSquareWithN('b', 1);
        expect(resultSquares).toHaveLength(3);
    });

    it('should return the allowed options for the first row g1', () => {
        const resultSquares = Squares.getSquaresOptionsFromSquareWithN('g', 1);
        expect(resultSquares).toHaveLength(3);
    });

    it('should return the allowed options for the center row d5', () => {
        const resultSquares = Squares.getSquaresOptionsFromSquareWithN('d', 5);
        expect(resultSquares).toHaveLength(8);
    });

    it('should contain the allowed options for the center row d5', () => {
        const resultSquares = Squares.getSquaresOptionsFromSquareWithN('d', 5);
        expect(resultSquares).toContain('e7');
        expect(resultSquares).toContain('f6');
        expect(resultSquares).toContain('f4');
        expect(resultSquares).toContain('f4');
        expect(resultSquares).toContain('e3');
        expect(resultSquares).toContain('c3');
        expect(resultSquares).toContain('b4');
        expect(resultSquares).toContain('b6');
        expect(resultSquares).toContain('c7');
    });

    it('should return the allowed options for the center row a6', () => {
        const resultSquares = Squares.getSquaresOptionsFromSquareWithN('a', 6);
        expect(resultSquares).toHaveLength(4);
    });
})

describe('Squares getSquaresOptionsFromSquareWithP', () => {

    it('should return the allowed options for white pawn with move flag b2', () => {
        const resultSquares = Squares.getSquaresOptionsFromSquareWithP('b', 2, white, true);
        expect(resultSquares).toHaveLength(4);
    });

    it('should return the allowed options for white pawn with no move flag b2', () => {
        const resultSquares = Squares.getSquaresOptionsFromSquareWithP('b', 2, white, false);
        expect(resultSquares).toHaveLength(2);
    });

    it('should return the allowed options for white pawn with no move flag a1', () => {
        const resultSquares = Squares.getSquaresOptionsFromSquareWithP('a', 2, white, false);
        expect(resultSquares).toHaveLength(1);
    });

    it('should return the allowed options for black pawn with no move flag g7', () => {
        const resultSquares = Squares.getSquaresOptionsFromSquareWithP('g', 7, black, false);
        expect(resultSquares).toContain('f6');
        expect(resultSquares).toContain('h6');
    });

    it('should return the allowed options for black pawn with move flag g7', () => {
        const resultSquares = Squares.getSquaresOptionsFromSquareWithP('g', 7, black, true);
        expect(resultSquares).toContain('f6');
        expect(resultSquares).toContain('h6');
        expect(resultSquares).toContain('g6');
        expect(resultSquares).toContain('g5');
    });

    it('should return the allowed options for black pawn with move flag e5', () => {
        const resultSquares = Squares.getSquaresOptionsFromSquareWithP('e', 5, black, true);
        expect(resultSquares).toContain('d4');
        expect(resultSquares).toContain('f4');
        expect(resultSquares).toContain('e4');
        expect(resultSquares).toContain('e3');
    });
})

describe('Squares getSquaresOptionsFromSquareWithB', () => {

    it('should return the allowed options for Bishop in c1 when limitation is active', () => {
        const mockSquareMap = Utils.createSquaresMap(rows, cols);
        // Mock other pieces to limit B moves options
        mockSquareMap.set('d2', {});

        const resultSquares = Squares.getSquaresOptionsFromSquareWithB(mockSquareMap, 'c', 1, true);
        expect(resultSquares).toHaveLength(3);
    });

    it('should return the allowed options for Bishop in c1 when limitation is not active', () => {
        const mockSquareMap = Utils.createSquaresMap(rows, cols);
        // Mock other pieces to limit B moves options
        mockSquareMap.set('d2', {});

        const resultSquares = Squares.getSquaresOptionsFromSquareWithB(mockSquareMap, 'c', 1, false);
        expect(resultSquares).toHaveLength(7);
    });
})

describe('Squares getSquaresOptionsFromSquareWithK', () => {
    it('should return the allowed options for King in d2', () => {
        const resultSquares = Squares.getSquaresOptionsFromSquareWithK('d', 2);
        expect(resultSquares).toHaveLength(8);
    });
})