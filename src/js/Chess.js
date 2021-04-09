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

        this.gameExportService = new GameExportService(null);

        this.boardService = new BoardService(this.config.board, { gameExportService: this.gameExportService });

        this.boardRenderService = new BoardRenderService(this.config.render, { boardService: this.boardService });

        this.analysisService = new AnalysisService(this.config.analysis, { boardService: this.boardService });

        this.controlsService = new ControlsService(this.actionsBridge);

        this.boardRenderService.drawBoardFromSquareMap().then(
            () => {
                // todo:refactor -> create square controls
                this.controlsService.squareControls()
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

    // Main methods

    async chessMove(originSquare, targetSquare) {
        await this.boardService.move(originSquare, targetSquare);
        const currentFen = this.gameExportService.convertSquareMapToFenStr(this.boardService.getSquaresMap());
        this.gameExportService.changeHistoryWithFen(currentFen);
        this.boardRenderService.drawPiecesFromMap();
        // todo:refactor
        // this.drawPiecesFromMap();
        // // COM: RePaint domains on move
        // if (this.state.isDomainWhiteOn) {
        //     this.drawDomainByColor(white);
        // }
        // if (this.state.isDomainBlackOn) {
        //     this.drawDomainByColor(black);
        // }
    }

    chessAddPiece(square, letter, color) {
        if (!square) { return; }
        this.boardService.setFigureInSquare(square, letter, color);
        const currentFen = this.gameExportService.convertSquareMapToFenStr(this.boardService.getSquaresMap());
        this.gameExportService.changeHistoryWithFen(currentFen);
        this.boardRenderService.drawPiecesFromMap();
    }

    chessClearBoard() {
        this.boardService.clear();
        const currentFen = this.gameExportService.convertSquareMapToFenStr(this.boardService.getSquaresMap());
        this.gameExportService.changeHistoryWithFen(currentFen);
        this.boardRenderService.drawPiecesFromMap();
    }
    chessInitBoard() {
        this.boardService.init();
        const currentFen = this.gameExportService.convertSquareMapToFenStr(this.boardService.getSquaresMap());
        this.gameExportService.changeHistoryWithFen(currentFen);
        this.boardRenderService.drawPiecesFromMap();
    }

    get actionsBridge() {
        return {
            // Board
            movePiecesFromSquares: (originSquare, targetSquare) => this.chessMove(originSquare, targetSquare),
            onFlip: async() => {
                await this.boardRenderService.drawBoardFlipped()
            },
            onAdd: (square, letter, color) => this.chessAddPiece(square, letter, color),
            onClearSquare: (square) => this.chessAddPiece(square, null),
            onClear: () => this.chessClearBoard(),
            onInit: () => this.chessInitBoard(),
            // Analyse
            onDisplayReportBalanceWhites: () => {},
            onDisplayReportBalanceBlacks: () => {},
            onShowSquareSupport: (squareTarget) => {},
            onShowSquareDomainSupport: (squareTarget) => {},
            onDomainW: async() => {},
            onDomainB: async() => {},
            onDomainsToggle: async() => {},
            onDomainsSquare: async(squareName) => {},
            onDomainDangerSquare: async(squareName) => {},
            onDomainAttacksSquare: async(squareName) => {},
            onShowAttackSquare: async(squareName) => {},
            onDangerSquare: async(squareName) => {},
            // Visuals
            onRemoveVisuals: () => {},
            onAddMarker: (squareTarget, markerId) => {},
            onToggleMarkers: () => {},
            // Imports, Extras
            onLoadFenFromInput: () => {},
            onLoadFenToInput: () => {},
            onCreateLink: () => {},
            onLoadPgn: () => {},
            // Navigation
            onNavRecord: () => {},
            onNavPrev: () => {},
            onNavNext: () => {},

        }
    }
}