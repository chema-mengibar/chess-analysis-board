import Utils from './chess-utils';
import { white, black } from './chess-const.js';

describe('parseConfig()', () => {

    it('should return - todo-config', () => {
        // todo
    });
})

describe('getCellKey()', () => {
    it('should return - todo-cellkey', () => {
        // todo
    });
})

describe('createSquaresMap()', () => {
    it('should return - todo', () => {
        // todo
    });
})

describe('createMarkersMap()', () => {
    it('should return - todo', () => {
        // todo
    });
})

describe('asSquare()', () => {
    it('should return - todo', () => {
        // todo
    });
})

describe('parseMapToFenStr()', () => {
    it('should return - todo', () => {
        // todo
    });
})

describe('parseFenStrToObject()', () => {
    it('should return - todo', () => {
        // todo
    });
})

describe('parsePgn()', () => {
    it('should return - todo', () => {
        // todo
    });
})

describe('parsePgnNotation()', () => {
    describe('notation with piece, origin square, capture', () => {

        const notation = 'Ndxf6';
        const moveColor = black;
        it('should return the figure', () => {
            const notationParts = Utils.parsePgnNotation(notation, moveColor);
            expect(notationParts[0].figure).toBe('n');
        });
        it('should return the squareFrom', () => {
            const notationParts = Utils.parsePgnNotation(notation, moveColor);
            expect(notationParts[0].squareFrom).toBe('d');
        });
        it('should return the squareTo', () => {
            const notationParts = Utils.parsePgnNotation(notation, moveColor);
            expect(notationParts[0].squareTo).toBe('f6');
        });
        it('should return the color', () => {
            const notationParts = Utils.parsePgnNotation(notation, moveColor);
            expect(notationParts[0].color).toBe(false);
        });
        it('should return the capture', () => {
            const notationParts = Utils.parsePgnNotation(notation, moveColor);
            expect(notationParts[0].capture).toBe(true);
        });
    })

    describe('notation with promotion', () => {

        const notation = 'g8=Q';
        const moveColor = white;
        it('should return the figure', () => {
            const notationParts = Utils.parsePgnNotation(notation, moveColor);
            expect(notationParts[0].figure).toBe('p');
        });
        it('should return the squareFrom', () => {
            const notationParts = Utils.parsePgnNotation(notation, moveColor);
            expect(notationParts[0].squareFrom).toBe(undefined);
        });
        it('should return the squareTo', () => {
            const notationParts = Utils.parsePgnNotation(notation, moveColor);
            expect(notationParts[0].squareTo).toBe('g8');
        });
        it('should return the color', () => {
            const notationParts = Utils.parsePgnNotation(notation, moveColor);
            expect(notationParts[0].color).toBe(true);
        });
        it('should return the capture', () => {
            const notationParts = Utils.parsePgnNotation(notation, moveColor);
            expect(notationParts[0].capture).toBe(undefined);
        });
        it('should return the figureToChange', () => {
            const notationParts = Utils.parsePgnNotation(notation, moveColor);
            expect(notationParts[0].figureToChange).toBe('q');
        });
    })
})