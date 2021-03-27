import { rows, cols, fenBase, white, black, figures } from './chess/chess-const.js';
import MovesRegistry from './MovesRegistry.js';
import Utils from './chess/chess-utils.js';
import Squares from './chess/chess-squares.js';
import Svg from './chess/chess-svg.js';
import Clipboard from './utils/clipboard.js';
import ChessControls from './chess/chess-controls.js';

export default class Chess {

    constructor(config) {
        // Init
        this.config = Utils.parseConfig(config);

        this.figures = figures;
        this.colors = {
            white: white,
            black: black,
        };

        this.movesRegistry = new MovesRegistry();

        // Run
        this.squaresMap = Utils.createSquaresMap(rows, cols);
        this.markersMap = Utils.createMarkersMap(rows, cols);

        const fenStr = config.fen || fenBase;

        this.fenToMap(fenStr);
        this.render();
        this.chessControls = new ChessControls(this.actionsBridge);

        this.state = {
            isDomainWhiteOn: false,
            isDomainBlackOn: false
        }
    }

    lab() {
        // this.drawMarkerInSquare('e4', 'id');
             // this.addMarkerToSquare('e4', 'marker-circle-white');
        // this.actionsBridge.onDomainB()
    }

    labMoves() {
        // In progress
        this.move('a2', 'a3');
        this.move('b2', 'b3');
        this.move('c2', 'c3');
        this.move('d2', 'd4');
        this.move('e2', 'e3');
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
            this.labMoves()
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

        const originPiece = this.squaresMap.get(originSquare);
        if (originPiece) {
            this.drawRemoveLastStepMoveMarker();
            this.setFigureInSquare(targetSquare, originPiece.letter, originPiece.color);
            this.setFigureInSquare(originSquare, null);
            this.drawPiecesFromMap();
            this.movesRegistry.saveMove(originSquare, targetSquare, this.squaresMap);
            this.addMarkerToSquare( originSquare, 'marker-move-last' );
            this.addMarkerToSquare( targetSquare, 'marker-move-last' );

            const currentFen = Utils.parseMapToFenStr(this.squaresMap);
            Utils.changeHistoryWithFen(currentFen);
            return true;
        }
    }

    loadFenFromInput() {
        const fenInputStr = document.getElementById("fen-input").value;
        this.fenToMap(fenInputStr);
        this.drawPiecesFromMap();
    }

    loadFenToInput() {
        const currentFen = Utils.parseMapToFenStr(this.squaresMap);
        document.getElementById("fen-input").value = currentFen;
    }

    // ----------------------------------------------- Moves control

     drawFromMove(move){
        this.fenToMap(move.fen);
        this.drawPiecesFromMap();
        this.drawRemoveLastStepMoveMarker();
        this.addMarkerToSquare( move.from, 'marker-move-last' );
        this.addMarkerToSquare( move.to, 'marker-move-last' );
        Utils.changeHistoryWithFen(move.fen);
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

    drawRemoveLastStepMoveMarker(){
        this.markersMap.forEach( markerItemList =>{
            const markerIdx = markerItemList.indexOf('marker-move-last');
            if (markerIdx > -1) {
                markerItemList.splice(markerIdx, 1);
            }
        })
        this.drawMarkersFromMap();
    }

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
            case 'marker-circle-white':
                Svg.addMarkerCircle(squareName, true);
                break;
            case 'marker-circle-neutral':
                Svg.addMarkerCircle(squareName);
                break;
            case 'marker-circle-black':
                Svg.addMarkerCircle(squareName, false);
                break;
            case 'marker-move-last':
                Svg.addMarkerMoveLast(squareName);
                break;
            case 'marker-rect-ok':
                Svg.addMarkerRect(squareName, true);
                break;
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
    getSquarePieceAllowedSquares(squareName, forcedPieceAndColor = null) {
        const limitation = this.config.withLimitation;
        const options = [];
        if (!squareName) {
            return;
        }
        const squareNameParts = squareName.split('');
        const squareColumnLetter = squareNameParts[0];
        const squareRowNumber = parseInt(squareNameParts[1], 10);
        const { letter, color } = forcedPieceAndColor ? forcedPieceAndColor : this.squaresMap.get(squareName);
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
        if (color) {
            this.state.isDomainWhiteOn = true;
        } else {
            this.state.isDomainBlackOn = true;
        }
        const domainClassName = this.getDomainClassNameByColor(color);
        const squaresInDomain = []
        this.squaresMap.forEach((squareEntry, squareName) => {
            if (squareEntry && squareEntry.color === color) {
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

    drawClearDomains(color = white) {
        if (color) {
            this.state.isDomainWhiteOn = false;
        } else {
            this.state.isDomainBlackOn = false;
        }
        const classNameColor = this.getDomainClassNameByColor(color);
        this.squaresMap.forEach((_, squareName) => {
            const classList = document.getElementById(`base-${squareName}`).classList;
            classList.remove(classNameColor);
        });
    }

    drawAttackFromSquare(squareName) {
        if (!squareName) {
            return;
        }
        const squarePiece = this.squaresMap.get(squareName);
        if (squarePiece) {
            const squareOptions = this.getSquarePieceAllowedSquares(squareName);
            const markerIdByColor = this.getMarkerCircleIdByColor(squarePiece.color);
            squareOptions.forEach(optionSquareKey => {
                const pieceInOptionSquare = this.squaresMap.get(optionSquareKey);
                if (pieceInOptionSquare && pieceInOptionSquare.color !== squarePiece.color) {
                    // target!
                    this.addMarkerToSquare(optionSquareKey, markerIdByColor);
                }
            })
        }
    }

    drawAttackFromSquareDomain(squareName) {
        if (!squareName) {
            return;
        }
        const squarePiece = this.squaresMap.get(squareName);
        if (squarePiece) {
            const markerIdByColor = this.getMarkerCircleIdByColor(squarePiece.color);
            const squareOptions = this.getSquarePieceAllowedSquares(squareName);
            this.drawDomainBySquare(squareName);
            squareOptions.forEach(domainSquareName => {
                const ghostPieceInDomain = squarePiece;
                const squareNextOptions = this.getSquarePieceAllowedSquares(domainSquareName, ghostPieceInDomain);
                squareNextOptions.forEach(nextDomainSquareName => {
                    const pieceInOptionSquare = this.squaresMap.get(nextDomainSquareName);
                    if (pieceInOptionSquare && pieceInOptionSquare.color !== squarePiece.color) {
                        // target!
                        this.addMarkerToSquare(squareName, 'marker-circle-neutral');
                        this.addMarkerToSquare(domainSquareName, markerIdByColor);
                        this.addMarkerToSquare(nextDomainSquareName, markerIdByColor);
                    }
                });
            });
        }
    }

    drawDangerToSquare(squareName) {
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


    drawDangerToSquareDomain(squareName) {
        if (!squareName) {
            return;
        }
        let isSquareSave = true;
        const squarePiece = this.squaresMap.get(squareName);
        if (squarePiece) {
            const squaresOptionsFromFigure = this.getSquarePieceAllowedSquares(squareName);
            squaresOptionsFromFigure.forEach(domainSquareName => {
               this.drawDomainBySquare(squareName);
                this.squaresMap.forEach((squareMapValue, squareMapKey) => {
                    if (squareMapKey !== squareName && squareMapValue && squareMapValue.color !== squarePiece.color) {
                        const squareMapSquareOptions = this.getSquarePieceAllowedSquares(squareMapKey);
                        // console.debug('[CHESS] drawAttacksToSquareDomain: mapOptions', squareMapSquareOptions);
                        // console.debug('[CHESS] drawAttacksToSquareDomain: ´fgure', squaresOptionsFromFigure);

                        const uniques = squaresOptionsFromFigure.filter(value => squareMapSquareOptions.includes(value));
                        uniques.forEach((commonSquare) => {
                            const markerIdByColor = this.getMarkerCircleIdByColor(squareMapValue.color);
                            this.addMarkerToSquare(squareMapKey, markerIdByColor);
                            this.addMarkerToSquare(commonSquare, markerIdByColor);

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

                this.addMarkerToSquare(squareName, 'marker-circle-neutral');
            }
        }
    }

    drawSupportToSquare(squareName) {
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
            this.drawDomainBySquare(squareName);

            const squaresOptionsFromFigure = this.getSquarePieceAllowedSquares(squareName);
            squaresOptionsFromFigure.forEach(domainSquareName => {

                this.squaresMap.forEach((squareMapValue, squareMapKey) => {
                    if (squareMapKey !== squareName && squareMapValue && squareMapValue.color === squarePiece.color) {
                        const squareMapSquareOptions = this.getSquarePieceAllowedSquares(squareMapKey);
                        // console.debug('[CHESS] drawSupportToSquareDomain: mapOptions', squareMapSquareOptions);
                        // console.debug('[CHESS] drawSupportToSquareDomain: ´fgure', squaresOptionsFromFigure);
                        const uniques = squaresOptionsFromFigure.filter(value => squareMapSquareOptions.includes(value));
                        uniques.forEach((commonSquare) => {
                            const markerIdByColor = this.getMarkerCircleIdByColor(squareMapValue.color);
                            this.addMarkerToSquare(squareMapKey, markerIdByColor);
                            this.addMarkerToSquare(commonSquare, markerIdByColor);

                        })
                        if (uniques.length > 0) {
                            isSquareSupported = true;
                        }
                    }
                })
            })
            if (isSquareSupported) {
                this.addMarkerToSquare(squareName, 'marker-circle-neutral');
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
                if (!this.state.isDomainWhiteOn) {
                    this.drawDomainByColor(white);

                } else {
                    this.drawClearDomains(white);
                }
            },
            onDomainB: async() => {
                if (!this.state.isDomainBlackOn) {
                    this.drawDomainByColor(black);

                } else {
                    this.drawClearDomains(black);
                }
            },
            onDomainsToggle: async() => {
                if (this.state.isDomainWhiteOn || this.state.isDomainBlackOn) {
                    this.drawClearDomains(white);
                    this.drawClearDomains(black);
                } else {
                    this.drawDomainByColor(white);
                    this.drawDomainByColor(black);
                }

            },
            onDomainsSquare: async(squareName) => {
                this.drawDomainBySquare(squareName);
            },
            onDomainDangerSquare: async(squareName) => {
                this.drawDangerToSquareDomain(squareName);
            },
            onDomainAttacksSquare: async(squareName) => {
                this.drawAttackFromSquareDomain(squareName);
            },
            onShowAttackSquare: async(squareName) => {
                this.drawAttackFromSquare(squareName)
            },
            onDangerSquare: async(squareName) => {
                this.drawDangerToSquare(squareName)
            },
            onRemoveVisuals: () => {
                this.drawRemoveAllMarkers();
                this.drawClearDomains(white);
                this.drawClearDomains(black);
            },
            onToggleMarkers: () => {
                Svg.toggleShowMarkersContainer();

            },
            onLoadFenFromInput: () => {
                this.loadFenFromInput();
            },
            onLoadFenToInput: () => {
                this.loadFenToInput();
            },
            onCreateLink: () => {
                const currentFen = Utils.parseMapToFenStr(this.squaresMap);
                const linkHref = Utils.getAbsoluteRouteWithFen(currentFen);
                Clipboard.addTextToClipboard(linkHref);

            },
            onNavPrev:()=>{
                const move = this.movesRegistry.prevMove;
                if(!move){
                    return;
                }
                this.drawFromMove(move)
            },
            onNavNext:()=>{
                const move = this.movesRegistry.nextMove;
                if(!move){
                    return;
                }
                this.drawFromMove(move)
            },

        }
    }

}
