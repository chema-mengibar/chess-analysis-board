import { rows, cols, fenBase, white, black, figures } from './chess/chess-const.js';
import MovesRegistry from './MovesRegistry.js';
import Utils from './chess/chess-utils.js';
import Squares from './chess/chess-squares.js';
import Svg from './chess/chess-svg.js';
import ChessControls from './chess/chess-controls.js';

export default class Chess {

    constructor(config) {
        // Init
        this.config = {
            flip: ('flip' in config) ? config.flip : false,
            asIcon: ('asIcon' in config) ? config.asIcon : true,
            asLines: ('asLines' in config) ? config.asLines : true,
            withLimitation: ('withLimitation' in config) ? config.withLimitation : false,
        }

        this.figures = figures;
        this.colors = {
            white: white,
            black: black,
        };

        this.movesRegistry = new MovesRegistry();

        // Run
        this.squaresMap = Utils.createSquaresMap(rows, cols);
        this.markersMap = Utils.createMarkersMap(rows, cols);

        const fenStr = ('fen' in config) ? config.fen : fenBase;
        this.fenToMap(fenStr);
        this.render();
        this.chessControls = new ChessControls(this.actionsBridge);

    }

    lab() {
        // this.drawMarkerInSquare('e4', 'cb');
        // this.drawMarkerInSquare('d3', 're');
        // this.drawMarkerInSquare('a1', 'ro');

        // this.addMarkerToSquare('e4', 'marker-circle-white');

    }

    labMoves() {
        // In progress
        this.move('e2', 'e4');
        this.move('d5', 'e4');
        this.move('d2', 'e4');
        this.move('f6', 'f5');
        console.log(this.movesRegistry.moves);
        console.log(this.movesRegistry.currentMoveIdx);

        setTimeout(() => {
            this.jumpToMove(1);
        }, 1000)
    }

    // ----------------------------------------------- Pieces & Board
    fenToMap(fen) {
        if (!fen || fen === '') {
            return
        }
        const fenAsObj = Utils.parseFenStrToObject(fen);
        this.squaresMap = new Map(Object.entries(fenAsObj));
    }


    async render() {
        this.drawBoard().then(() => {
            this.chessControls.squareControls();

            this.lab()
        });
    }

    flipBoard() {
        this.config.flip = !this.config.flip;
        const squares = document.querySelectorAll(".square");
        const boardCoordinate = document.querySelectorAll(".board-coordinate");
        squares.forEach(squareNode => {
            squareNode.remove();
        });
        boardCoordinate.forEach(squareNode => {
            squareNode.remove();
        })
        this.render()
    }

    async move(originSquare, targetSquare) {
        console.log('[CHESS] move');
        const originPiece = this.squaresMap.get(originSquare);
        if (originPiece) {
            this.setFigureInSquare(targetSquare, originPiece.letter, originPiece.color);
            this.setFigureInSquare(originSquare, null);
            this.drawPiecesFromMap();
            this.movesRegistry.saveMove(originSquare, targetSquare, this.squaresMap);
            return true;
        }
    }

    loadFenFromInput() {
        const fenInputStr = document.getElementById("fen-input").value;
        this.fenToMap(fenInputStr);
        this.drawPiecesFromMap();
    }

    // ----------------------------------------------- Moves control

    jumpToMove(moveIdx) {
        const move = this.movesRegistry.moves[moveIdx];
        this.fenToMap(move.fen);
        this.drawPiecesFromMap();
        this.drawMarkerInSquare(move.from, 'marker-move-last');
        this.drawMarkerInSquare(move.to, 'marker-move-last');
    }

    // ----------------------------------------------- Maps

    setFigureInSquare(squareName, letter, color = white) {
        this.squaresMap.set(squareName, Utils.asSquare(letter, color));
    }

    addMarkerToSquare(squareName, markerId, forceRemove = false) {
        if (!squareName) {
            return
        }
        const squareMarkers = this.markersMap.get(squareName);

        const selectedMarkerIdInSquare = squareMarkers.indexOf(markerId);
        if (selectedMarkerIdInSquare === -1) {
            squareMarkers.push(markerId);
            this.markersMap.set(squareName, squareMarkers);
            this.drawMarkerInSquare(squareName, markerId);
        }
        if (forceRemove && selectedMarkerIdInSquare > -1) {
            squareMarkers.splice(selectedMarkerIdInSquare, 1);
            console.log(squareMarkers)
            this.markersMap.set(squareName, squareMarkers);
            this.drawMarkersFromMapBySquareName(squareName);
        }
    }

    // ----------------------------------------------- Draw: Markers, Pieces
    async drawBoard() {
        const svg = document.getElementById("svg-squares");
        const svgCoordinates = document.getElementById("svg-coordinates");
        const flip = this.config.flip;
        const flipedRows = flip ? [...rows].reverse() : rows;
        const flipedCols = flip ? [...cols].reverse() : cols;

        flipedRows.forEach((row, rowIdx) => {
            flipedCols.forEach((colLetter, colIdx) => {
                const squareEl = Svg.createSquare(colLetter, colIdx, row, rowIdx, this.config.asIcon);
                svg.appendChild(squareEl);
            })
        })


        this.drawPiecesFromMap();

        const coordinatesItems = Svg.createCoordinates(flipedRows, flipedCols);
        coordinatesItems.forEach(coorItem => {
            svgCoordinates.appendChild(coorItem);
        })
    }

    drawPiecesFromMap() {
        this.squaresMap.forEach((squareEntry, squareKey) => {
            if (squareEntry) {
                let figureText = '';
                const entryFigure = figures[squareEntry.letter];
                if (this.config.asIcon === true) {
                    figureText = entryFigure.asIcon(squareEntry.color);
                } else {
                    figureText = entryFigure.asLetter(squareEntry.color);
                }
                Svg.setPieceInSquare(squareKey, figureText, squareEntry.color)
            } else {
                Svg.setPieceInSquare(squareKey)
            }
        })
    }

    drawMarkersFromMap() {
        this.markersMap.forEach((markerEntry, squareKey) => {
            Svg.removeSquareMarkers(squareKey);

            markerEntry.forEach(markerItemId => {
                this.drawMarkerInSquare(squareKey, markerItemId);
            })
        })
    }

    drawMarkersFromMapBySquareName(squareName) {
        //remove all markers first
        Svg.removeSquareMarkers(squareName);
        // Redraw markers from map
        const squareMarkers = this.markersMap.get(squareName);
        squareMarkers.forEach(markerItemId => {
            this.drawMarkerInSquare(squareName, markerItemId);
        })

    }

    drawMarkerInSquare(squareName, markerId) {
        switch (markerId) {
            case 'cw':
            case 'marker-circle-white':
                Svg.addMarkerCircle(squareName, true);
                break;
            case 'cn':
            case 'marker-circle-neutral':
                Svg.addMarkerCircle(squareName);
                break;
            case 'cb':
            case 'marker-circle-black':
                Svg.addMarkerCircle(squareName, false);
                break;
            case 'm':
            case 'marker-move-last':
                Svg.addMarkerMoveLast(squareName);
                break;
            case 'ro':
            case 'marker-rect-ok':
                Svg.addMarkerRect(squareName, true);
                break;
            case 're':
            case 'marker-rect-error':
                Svg.addMarkerRect(squareName, false);
                break;
            default:
                break;
        }
    }

    getMarkerCircleIdByColor(color) {
        return color ? 'marker-circle-white' : 'marker-circle-black';
    }

    drawRemoveAllMarkers() {
        this.markersMap = Utils.createMarkersMap(rows, cols);
        this.drawMarkersFromMap()
    }



    // ----------------------------------------------- Engine
    getSquarePieceAllowedSquares(squareName) {

        const limitation = this.config.withLimitation;

        const options = [];
        if (!squareName) {
            return;
        }
        const squareNameParts = squareName.split('');

        const squareColumnLetter = squareNameParts[0];
        const squareRowNumber = parseInt(squareNameParts[1], 10);

        const { letter, color } = this.squaresMap.get(squareName);

        if (letter === 'r') {
            const squareOptions = Squares.getSquaresOptionsFromSquareWithR(this.squaresMap, squareColumnLetter, squareRowNumber, limitation);
            options.push(...squareOptions);
        }
        if (letter === 'n') {
            const squareOptions = Squares.getSquaresOptionsFromSquareWithN(squareColumnLetter, squareRowNumber);
            options.push(...squareOptions);
        }
        if (letter === 'p') {
            const squareOptions = Squares.getSquaresOptionsFromSquareWithP(squareColumnLetter, squareRowNumber, color);
            options.push(...squareOptions);
        }
        if (letter === 'b') {
            const squareOptions = Squares.getSquaresOptionsFromSquareWithB(this.squaresMap, squareColumnLetter, squareRowNumber, limitation);
            options.push(...squareOptions);
        }
        if (letter === 'q') {
            const squareOptionsVertHorz = Squares.getSquaresOptionsFromSquareWithR(this.squaresMap, squareColumnLetter, squareRowNumber, limitation);
            const squareOptionsDiagonal = Squares.getSquaresOptionsFromSquareWithB(this.squaresMap, squareColumnLetter, squareRowNumber, limitation);
            options.push(...squareOptionsVertHorz, ...squareOptionsDiagonal);
        }
        if (letter === 'k') {
            const squareOptions = Squares.getSquaresOptionsFromSquareWithK(squareColumnLetter, squareRowNumber);
            options.push(...squareOptions);
        }
        return options;
    }

    getDomainClassNameByColor(color) {
        return color ? 'with-domain-white' : 'with-domain-black';
    }

    drawDomainByColor(color = white) {
        const domainClassName = this.getDomainClassNameByColor(color);
        const squaresInDomain = []
        this.squaresMap.forEach((squareEntry, squareName) => {
            if (squareEntry && squareEntry.color === white) {
                const squaresFromFigure = this.getSquarePieceAllowedSquares(squareName);
                squaresInDomain.push(...squaresFromFigure);
            }
        })
        squaresInDomain.forEach(squareName => {
            document.getElementById(`base-${squareName}`).classList.add(domainClassName);
        })
    }

    drawDomainBySquare(squareName) {
        const squarePiece = this.squaresMap.get(squareName);
        if (squarePiece) {

            const markerIdBySquareColor = this.getMarkerCircleIdByColor(squarePiece.color);
            this.addMarkerToSquare(squareName, markerIdBySquareColor);

            const squaresFromFigure = this.getSquarePieceAllowedSquares(squareName);
            squaresFromFigure.forEach(domainSquareName => {
                const classNameDomain = this.getDomainClassNameByColor(squarePiece.color);
                document.getElementById(`base-${domainSquareName}`).classList.add(classNameDomain);
            })
        }
    }

    drawClearDomains() {
        const classNameWhite = this.getDomainClassNameByColor(white);
        const classNameBlack = this.getDomainClassNameByColor(black);
        this.squaresMap.forEach((_, squareName) => {
            const classList = document.getElementById(`base-${squareName}`).classList;
            classList.remove(classNameWhite);
            classList.remove(classNameBlack);
        });
    }

    drawAttacksToSquare(squareName) {
        if (!squareName) {
            return;
        }
        let isSquareSave = true;
        const squarePiece = this.squaresMap.get(squareName);
        if (squarePiece) {
            this.squaresMap.forEach((squareMapValue, squareMapKey) => {
                if (squareMapKey !== squareName && squareMapValue && squareMapValue.color !== squarePiece.color) {
                    const squareMapSquareOptions = this.getSquarePieceAllowedSquares(squareMapKey);
                    // console.debug('[CHESS] drawAttacksToSquare: mapOptions', squareMapSquareOptions);
                    if (squareMapSquareOptions.includes(squareName)) {
                        isSquareSave = false;
                        const markerIdByColor = this.getMarkerCircleIdByColor(squareMapValue.color);
                        this.addMarkerToSquare(squareMapKey, markerIdByColor)
                        this.drawDomainBySquare(squareMapKey);
                    }
                }
            })
            if (isSquareSave) {
                this.addMarkerToSquare(squareName, 'marker-rect-ok');
            } else {
                const markerIdBySquareColor = this.getMarkerCircleIdByColor(squarePiece.color);
                this.addMarkerToSquare(squareName, markerIdBySquareColor);
            }
        }
    }

    drawAttacksToSquareDomain(squareName) {
        if (!squareName) {
            return;
        }
        let isSquareSave = true;
        const squarePiece = this.squaresMap.get(squareName);
        if (squarePiece) {

            const squaresOptionsFromFigure = this.getSquarePieceAllowedSquares(squareName);
            squaresOptionsFromFigure.forEach(domainSquareName => {
                const classNameDomain = this.getDomainClassNameByColor(squarePiece.color);
                document.getElementById(`base-${domainSquareName}`).classList.add(classNameDomain);

                this.squaresMap.forEach((squareMapValue, squareMapKey) => {
                    if (squareMapKey !== squareName && squareMapValue && squareMapValue.color !== squarePiece.color) {
                        const squareMapSquareOptions = this.getSquarePieceAllowedSquares(squareMapKey);
                        // console.debug('[CHESS] drawAttacksToSquareDomain: mapOptions', squareMapSquareOptions);
                        // console.debug('[CHESS] drawAttacksToSquareDomain: ´fgure', squaresOptionsFromFigure);

                        const uniques = squaresOptionsFromFigure.filter(value => squareMapSquareOptions.includes(value));
                        uniques.forEach((commonSquare) => {
                            const markerIdByColor = this.getMarkerCircleIdByColor(squareMapValue.color);
                            this.addMarkerToSquare(squareMapKey, markerIdByColor);
                            this.addMarkerToSquare(commonSquare, 'marker-circle-neutral');

                        })
                        if (uniques.length > 0) {
                            isSquareSave = false;
                        }
                    }
                })
            })
            if (isSquareSave) {
                this.addMarkerToSquare(squareName, 'marker-rect-ok');
            } else {
                const markerIdBySquareColor = this.getMarkerCircleIdByColor(squarePiece.color);
                this.addMarkerToSquare(squareName, markerIdBySquareColor);
            }
        }
    }

    drawSupportToSquare(squareName) {
        console.log('[CHESS] drawSupportToSquare:', squareName);
        if (!squareName) {
            return;
        }
        let isSquareSupported = false;
        const squarePiece = this.squaresMap.get(squareName);
        if (squarePiece) {
            this.squaresMap.forEach((squareMapValue, squareMapKey) => {
                if (squareMapKey !== squareName && squareMapValue && squareMapValue.color === squarePiece.color) {
                    const squareMapSquareOptions = this.getSquarePieceAllowedSquares(squareMapKey);
                    console.debug('[CHESS] drawSupportToSquare: mapOptions', squareMapSquareOptions);
                    if (squareMapSquareOptions.includes(squareName)) {
                        isSquareSupported = true;
                        const markerIdByColor = this.getMarkerCircleIdByColor(squareMapValue.color);
                        this.addMarkerToSquare(squareMapKey, markerIdByColor)
                        this.drawDomainBySquare(squareMapKey);
                    }
                }
            })
            if (isSquareSupported) {
                this.addMarkerToSquare(squareName, 'marker-rect-ok');
            } else {
                this.addMarkerToSquare(squareName, 'marker-rect-error');
            }
        }
    }

    drawSupportToSquareDomain(squareName) {
        if (!squareName) {
            return;
        }
        let isSquareSupported = false;
        const squarePiece = this.squaresMap.get(squareName);
        if (squarePiece) {

            const squaresOptionsFromFigure = this.getSquarePieceAllowedSquares(squareName);
            squaresOptionsFromFigure.forEach(domainSquareName => {
                const classNameDomain = this.getDomainClassNameByColor(squarePiece.color);
                document.getElementById(`base-${domainSquareName}`).classList.add(classNameDomain);

                this.squaresMap.forEach((squareMapValue, squareMapKey) => {
                    if (squareMapKey !== squareName && squareMapValue && squareMapValue.color === squarePiece.color) {
                        const squareMapSquareOptions = this.getSquarePieceAllowedSquares(squareMapKey);
                        // console.debug('[CHESS] drawSupportToSquareDomain: mapOptions', squareMapSquareOptions);
                        // console.debug('[CHESS] drawSupportToSquareDomain: ´fgure', squaresOptionsFromFigure);

                        const uniques = squaresOptionsFromFigure.filter(value => squareMapSquareOptions.includes(value));
                        uniques.forEach((commonSquare) => {
                            const markerIdByColor = this.getMarkerCircleIdByColor(squareMapValue.color);
                            this.addMarkerToSquare(squareMapKey, markerIdByColor);
                            this.addMarkerToSquare(commonSquare, 'marker-circle-neutral');

                        })
                        if (uniques.length > 0) {
                            isSquareSupported = true;
                        }
                    }
                })
            })
            if (isSquareSupported) {
                this.addMarkerToSquare(squareName, 'marker-rect-ok');
            } else {
                this.addMarkerToSquare(squareName, 'marker-rect-error');
            }
        }
    }

    // ----------------------------------------------- Control Actions Bridge
    get actionsBridge() {

        return {
            onShowSquareSupport: (squareTarget) => {
                this.drawSupportToSquare(squareTarget);
            },
            onShowSquareDomainSupport: (squareTarget) => {
                this.drawSupportToSquareDomain(squareTarget);
            },
            onFlip: () => {
                this.flipBoard()
            },
            movePiecesFromSquares: async(originSquare, targetSquare) => {
                return this.move(originSquare, targetSquare);
            },
            onAddMarker: (squareTarget, markerId) => {
                this.addMarkerToSquare(squareTarget, markerId, true);
            },
            onAdd: (square, letter, color) => {
                if (!square) { return; }
                this.setFigureInSquare(square, letter, color);
                this.drawPiecesFromMap();
            },
            onClearSquare: (square) => {
                if (!square) { return; }
                this.setFigureInSquare(square, null);
                this.drawPiecesFromMap();
            },
            onClear: () => {
                this.squaresMap = Utils.createSquaresMap(rows, cols);
                this.drawPiecesFromMap();
            },
            onInit: () => {
                this.fenToMap(fenBase);
                this.drawPiecesFromMap();
            },
            onDomainW: async() => {
                this.drawDomainByColor(white);
            },
            onDomainB: async() => {
                this.drawDomainByColor(black);
            },
            onDomainsHide: async() => {
                this.drawClearDomains();
            },
            onDomainsSquare: async(squareName) => {
                this.drawDomainBySquare(squareName);
            },
            onDomainAttacksSquare: async(squareName) => {
                this.drawAttacksToSquareDomain(squareName);
            },
            onAttacksSquare: async(squareName) => {
                this.drawAttacksToSquare(squareName)
            },
            onRemoveMarkers: () => {
                this.drawRemoveAllMarkers()
            },
            onToggleMarkers: () => {
                Svg.toggleShowMarkersContainer();

            },
            onLoadFenFromInput: () => {
                this.loadFenFromInput();
            }
        }
    }

}