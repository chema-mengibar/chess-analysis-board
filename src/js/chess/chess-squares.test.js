import Squares from './chess-squares.js';
import Utils from './chess-utils';
import { rows, cols } from './chess-const.js';


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

    it('should return - todo-01', () => {
        // todo
    });
})

describe('Squares getSquaresOptionsFromSquareWithP', () => {

    it('should return - todo-02', () => {
        // todo
    });
})

describe('Squares getSquaresOptionsFromSquareWithB', () => {

    it('should return - todo-03', () => {
        // todo
    });
})

describe('Squares getSquaresOptionsFromSquareWithK', () => {

    it('should return - todo-04', () => {
        // todo
    });
})