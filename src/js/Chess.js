import { fenBase, white, black } from './utils/chess.constants.js';

import ControlsService from './services/controls-service/controls.service.js'
import BoardService from './services/board-service/board.service.js';
import BoardRenderService from './services/board-render-service/board-render.service.js';
import GameExportService from './services/game-export-service/game-export.service.js';
import AnalysisService from './services/analysis-service/analysis.service.js';


export default class Chess {

    constructor(config) {

        this.config = this.parseConfig(config);

        this.boardService = new BoardService(this.config.board);

        this.boardRenderService = new BoardRenderService(this.config.render, { boardService: this.boardService });

        this.analysisService = new AnalysisService(this.config.analysis, {
            boardService: this.boardService,
        });

        this.gameExportService = new GameExportService(null, {
            boardService: this.boardService,
            analysisService: this.analysisService
        });

        this.controlsService = new ControlsService(this.actionsBridge);

        this.boardRenderService.drawBoardFromSquareMap().then(
            () => {
                this.controlsService.squareControls();
                this.lab();
            }
        )
    }

    lab() {
        //this.actionsBridge.onDomainDangerSquare('e2');
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
        this.boardRenderService.drawPiecesFromMap();
        this.analysisService.drawDomainsByState();
    }

    chessAddPiece(square, letter, color) {
        if (!square) { return; }
        this.boardService.setFigureInSquare(square, letter, color);
        this.boardRenderService.drawPiecesFromMap();
    }

    chessClearBoard() {
        this.boardService.clear();
        this.boardRenderService.drawPiecesFromMap();
    }
    chessInitBoard() {
        this.boardService.init();
        this.boardRenderService.drawPiecesFromMap();
    }

    get actionsBridge() {
        return {

            // Board
            movePiecesFromSquares: (originSquare, targetSquare) => this.chessMove(originSquare, targetSquare),
            onFlip: async() => {
                await this.boardRenderService.drawBoardFlipped();
                this.controlsService.squareControls();
                this.lab();
            },
            onAdd: (square, letter, color) => this.chessAddPiece(square, letter, color),
            onClearSquare: (square) => this.chessAddPiece(square, null),
            onClear: () => this.chessClearBoard(),
            onInit: () => this.chessInitBoard(),

            // Analyse
            onDisplayReportBalanceWhites: () => {
                this.analysisService.boardSquareDangerSupportRepor(white);
            },
            onDisplayReportBalanceBlacks: () => {
                this.analysisService.boardSquareDangerSupportRepor(black);
            },
            onShowSquareSupport: (squareTarget) => {
                this.analysisService.drawSupportToSquare(squareTarget);
            },
            onShowSquareDomainSupport: (squareTarget) => {
                this.analysisService.drawSupportToSquareDomain(squareTarget);
            },
            onDomainW: async() => {
                await this.analysisService.toggleColorDomain(white)
            },
            onDomainB: async() => {
                await this.analysisService.toggleColorDomain(black)
            },
            onDomainsToggle: async() => {
                await this.analysisService.toggleDomains()
            },
            onDomainsSquare: async(squareName) => {
                this.analysisService.drawDomainBySquare(squareName);
            },
            onDomainDangerSquare: (squareName) => {
                this.analysisService.drawDangerToSquareDomain(squareName);
            },
            onDomainAttacksSquare: async(squareName) => {
                this.analysisService.drawAttackFromSquareDomain(squareName);
            },
            onShowAttackSquare: async(squareName) => {
                this.analysisService.drawAttackFromSquare(squareName)
            },
            onDangerSquare: async(squareName) => {
                this.analysisService.drawDangerToSquare(squareName)
            },

            // Visuals
            onRemoveVisuals: () => {
                this.analysisService.drawRemoveAllMarkers();
                this.analysisService.drawClearDomains(white);
                this.analysisService.drawClearDomains(black);
            },
            onAddMarker: (squareTarget, markerId) => {
                this.analysisService.addMarkerToSquare(squareTarget, markerId, true);
            },
            onToggleMarkers: () => {
                this.analysisService.toggleMarkers();
            },

            // Imports, Extras
            onLoadFenFromInput: () => {
                this.gameExportService.loadFenFromInput();
                this.boardRenderService.drawPiecesFromMap();
            },
            onLoadFenToInput: () => {
                this.gameExportService.loadFenToInput();
            },
            onCreateLink: () => {
                this.gameExportService.createBoardLink();
            },
            onLoadPgn: () => {
                this.gameExportService.loadPgnFromInput();
                this.boardRenderService.drawPiecesFromMap();
            },
            // Navigation
            onNavRecord: () => {
                this.boardService.moveSave();
            },
            onNavPrev: () => {
                this.boardService.movePrev();
                this.boardRenderService.drawPiecesFromMap();
                this.analysisService.drawDomainsByState();
            },
            onNavNext: () => {
                this.boardService.moveNext();
                this.boardRenderService.drawPiecesFromMap();
                this.analysisService.drawDomainsByState();

            },

        }
    }
}