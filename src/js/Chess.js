import { rows, cols, fenBase, white, black, figures, flankC } from './utils/chess.constants.js';

import ControlsService from './services/controls-service/controls.service.js'
import BoardService from './services/board-service/board.service.js';
import BoardRenderService from './services/board-render-service/board-render.service.js';
import GameExportService from './services/game-export-service/game-export.service.js';
import AnalysisService from './services/analysis-service/analysis.service.js';

// [] todo: refactor -> reassign controls on flip
// [] todo: refactor -> onload  fen from input fiel in CONTROLS, call RENDER this.drawPiecesFromMap();
// [] todo: refactor -> controls gameExport.loadFenToInput();
// [] todo: refactor -> controls next & prev draw pieces ;
// [] todo: refactor -> initial record board 

export default class Chess {

    constructor(config) {

        this.config = this.parseConfig(config);

        const gameExportService = new GameExportService(null);

        const boardService = new BoardService(this.config.board, { gameExportService });

        const boardRenderService = new BoardRenderService(this.config.render, { boardService });

        const analysisService = new AnalysisService(this.config.analysis, { boardService });

        const controlsService = new ControlsService(this.actionsBridge);

        boardRenderService.drawBoardFromSquareMap().then(
            () => {
                // todo:refactor -> create square controls
            }
        )
    }

    parseConfig(config) {
        return {
            analysis: {
                withLimitation: ('withLimitation' in config) ? config.withLimitation : false,
            },
            board: {
                fen: ('fen' in config) ? config.fen : fenBase,
            },
            render: {
                flip: ('flip' in config) ? config.flip : false,
                asIcon: ('asIcon' in config) ? config.asIcon : true,
                asLines: ('asLines' in config) ? config.asLines : true,
            }
        };
    }

    get actionsBridge() {
        return {
            onShowSquareSupport: (squareTarget) => {},
            onShowSquareDomainSupport: (squareTarget) => {},
            onFlip: () => {},
            movePiecesFromSquares: async(originSquare, targetSquare) => {},
            onAddMarker: (squareTarget, markerId) => {},
            onAdd: (square, letter, color) => {},
            onClearSquare: (square) => {},
            onClear: () => {},
            onInit: () => {},
            onDomainW: async() => {},
            onDomainB: async() => {},
            onDomainsToggle: async() => {},
            onDomainsSquare: async(squareName) => {},
            onDomainDangerSquare: async(squareName) => {},
            onDomainAttacksSquare: async(squareName) => {},
            onShowAttackSquare: async(squareName) => {},
            onDangerSquare: async(squareName) => {},
            onRemoveVisuals: () => {},
            onToggleMarkers: () => {},
            onLoadFenFromInput: () => {},
            onLoadFenToInput: () => {},
            onCreateLink: () => {},
            onNavPrev: () => {},
            onNavNext: () => {},
            onNavRecord: () => {},
            onLoadPgn: () => {},
            onDisplayReportBalanceWhites: () => {},
            onDisplayReportBalanceBlacks: () => {}
        }
    }
}