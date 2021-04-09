import GameExportService from './game-export.service.js';

describe('getAbsoluteRouteWithFen()', () => {

    const gameExportService = new GameExportService()

    it('should return the path url with fen parameter in query', () => {
        const mockFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
        const result = gameExportService.getAbsoluteRouteWithFen(mockFen);
        expect(result).toBe('http://dummy.test/version?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
    })

    it('should return the path url without fen parameter in query', () => {

        const result = gameExportService.getAbsoluteRouteWithFen();
        expect(result).toBe('http://dummy.test/version');
    })
})