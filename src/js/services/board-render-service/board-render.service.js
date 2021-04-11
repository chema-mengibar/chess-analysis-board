import { rows, cols, boardSize, figures } from '../../utils/chess.constants.js';
import SvgBoardUtils from './board-render-svg.utils.js';
import UrlUtils from '../../utils/url.js';

export default class BoardRenderService {

    constructor(config, services) {

        this.config = {
            flip: config.flip,
            asIcon: config.asIcon,
            svg: {
                div: boardSize / 8
            }
        }

        this.boardService = services.boardService;
    }

    changeHistoryWithFen(fen) {
        const url = UrlUtils.getAbsoluteRouteWithFen(fen);
        history.pushState({
            id: 'game-render'
        }, '', url);
    }

    getRows() {
        return this.config.flip ? [...rows].reverse() : rows;
    }

    getCols() {
        return this.config.flip ? [...cols].reverse() : cols;
    }


    async drawBoardFromSquareMap() {
        this.drawCoordinates();
        this.drawSquares();
        this.drawPiecesFromMap();
    }

    async drawBoardFlipped() {
        const squares = document.querySelectorAll(".square");
        const boardCoordinate = document.querySelectorAll(".board-coordinate");
        squares.forEach(squareNode => {
            squareNode.remove();
        });
        boardCoordinate.forEach(squareNode => {
            squareNode.remove();
        })

        this.config.flip = !this.config.flip;

        this.drawBoardFromSquareMap();
    }

    drawSquares() {
        const flipedRows = this.getRows();
        const flipedCols = this.getCols();

        const svg = document.getElementById("svg-squares");

        flipedRows.forEach((row, rowIdx) => {
            flipedCols.forEach((colLetter, colIdx) => {
                const squareEl = SvgBoardUtils.createSquare(colLetter, colIdx, row, rowIdx, this.config);
                svg.appendChild(squareEl);
            })
        })
    }

    drawCoordinates() {

        const flipedRows = this.getRows();
        const flipedCols = this.getCols();

        const svgCoordinates = document.getElementById("svg-coordinates");

        flipedCols.forEach((col, idx) => {
            const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
            const textNode = document.createTextNode(col);
            textEl.setAttribute('x', `${this.config.svg.div * idx}%`);
            textEl.setAttribute('y', '0');
            textEl.setAttribute('dy', '0');
            textEl.setAttribute('dx', '1');
            textEl.setAttribute('data-coord-col', `${col}`);
            textEl.setAttribute('class', 'board-coordinate board-coordinate-col');
            textEl.setAttribute('text-anchor', 'start');
            textEl.appendChild(textNode);

            svgCoordinates.appendChild(textEl);
        })

        flipedRows.forEach((row, idx) => {
            const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
            const textNode = document.createTextNode(row);
            textEl.setAttribute('x', '0');
            textEl.setAttribute('y', `${this.config.svg.div * idx}%`);
            textEl.setAttribute('dy', '6');
            textEl.setAttribute('dx', '-3');
            textEl.setAttribute('data-coord-row', `${row}`);
            textEl.setAttribute('class', 'board-coordinate board-coordinate-row');
            textEl.setAttribute('text-anchor', 'start');
            textEl.appendChild(textNode);

            svgCoordinates.appendChild(textEl);
        })
    }

    drawPiecesFromMap() {
        const squaresMap = this.boardService.getSquaresMap();
        squaresMap.forEach((squareEntry, squareKey) => {
            if (squareEntry) {
                let figureText = '';
                const entryFigure = figures[squareEntry.letter];
                if (this.config.asIcon === true) {
                    figureText = entryFigure.asIcon(squareEntry.color);
                } else {
                    figureText = entryFigure.asLetter(squareEntry.color);
                }
                SvgBoardUtils.setPieceInSquare(squareKey, figureText, squareEntry.color)
            } else {
                SvgBoardUtils.setPieceInSquare(squareKey)
            }
        })

        const currentFen = this.boardService.getSquareMapAsFen();
        this.changeHistoryWithFen(currentFen);
    }




}