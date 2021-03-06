import { white, black } from '../../utils/chess.constants.js';
import AnalysisSvgUtils from './analysis-svg.utils.js'
import AnalysisSquaresUtils from './analysis-squares.utils.js'

// todo
// export const flankQ = ['a', 'b', 'c', 'd', ];
// export const flankK = ['e', 'f', 'g', 'h', ];
// export const flankC = ['c', 'd', 'e', 'f'];

export default class AnalysisService {

    constructor(config, services) {
        this.markersMap = AnalysisSvgUtils.createMarkersMap();
        this.boardService = services.boardService;

        this.config = config;

        this.state = {
            isDomainWhiteOn: false,
            isDomainBlackOn: false,
        }
    }

    toggleMarkers() {
        AnalysisSvgUtils.toggleShowMarkersContainer();
    }

    toggleColorDomain(color = white) {
        const colorFlagState = color ? this.state.isDomainWhiteOn : this.state.isDomainBlackOn;
        if (!colorFlagState) {
            this.drawDomainByColor(color);
        } else {
            this.drawClearDomains(color);
        }
    }

    toggleDomains() {
        if (this.state.isDomainWhiteOn || this.state.isDomainBlackOn) {
            this.drawClearDomains(white);
            this.drawClearDomains(black);
        } else {
            this.drawDomainByColor(white);
            this.drawDomainByColor(black);
        }
    }


    drawDomainsByState() {
        if (this.state.isDomainWhiteOn) {
            this.drawDomainByColor(white);
        }
        if (this.state.isDomainBlackOn) {
            this.drawDomainByColor(black);
        }
    }

    addMarkerToSquare(squareName, markerId, forceRemove = false) {
        if (!squareName) {
            return
        }
        AnalysisSvgUtils.forceShowMarkers();
        const squareMarkers = this.markersMap.get(squareName);

        const selectedMarkerIdInSquare = squareMarkers.indexOf(markerId);
        if (selectedMarkerIdInSquare === -1) {
            squareMarkers.push(markerId);
            this.markersMap.set(squareName, squareMarkers);
            AnalysisSvgUtils.drawMarkerInSquare(squareName, markerId);
        }
        if (forceRemove && selectedMarkerIdInSquare > -1) {
            squareMarkers.splice(selectedMarkerIdInSquare, 1);
            this.markersMap.set(squareName, squareMarkers);
            this.drawMarkersFromMapBySquareName(squareName);
        }
    }

    drawMarkersFromMap() {
        AnalysisSvgUtils.forceShowMarkers();

        this.markersMap.forEach((markerEntry, squareKey) => {
            AnalysisSvgUtils.removeSquareMarkers(squareKey);
            markerEntry.forEach(markerItemId => {
                AnalysisServiceUtils.drawMarkerInSquare(squareKey, markerItemId);
            })
        })
    }

    drawMarkersFromMapBySquareName(squareName) {
        AnalysisSvgUtils.forceShowMarkers();

        //remove all markers first
        AnalysisSvgUtils.removeSquareMarkers(squareName);
        // Redraw markers from map
        const squareMarkers = this.markersMap.get(squareName);
        squareMarkers.forEach(markerItemId => {
            AnalysisSvgUtils.drawMarkerInSquare(squareName, markerItemId);
        })
    }

    drawRemoveAllMarkers() {
        this.markersMap = AnalysisSvgUtils.createMarkersMap();
        this.drawMarkersFromMap()
    }

    getSquarePieceAllowedSquares(squareName, forcedPieceAndColor = null, allowPawnMove = false) {

        const squaresMap = this.boardService.getSquaresMap();

        const limitation = this.config.withLimitation;
        const options = [];
        if (!squareName) {
            return;
        }
        const squareNameParts = squareName.split('');
        const squareColumnLetter = squareNameParts[0];
        const squareRowNumber = parseInt(squareNameParts[1], 10);
        const { letter, color } = forcedPieceAndColor ? forcedPieceAndColor : squaresMap.get(squareName);
        if (letter === 'r') {
            const squareOptions = AnalysisSquaresUtils.getSquaresOptionsFromSquareWithR(squaresMap, squareColumnLetter, squareRowNumber, limitation);
            options.push(...squareOptions);
        }
        if (letter === 'n') {
            const squareOptions = AnalysisSquaresUtils.getSquaresOptionsFromSquareWithN(squareColumnLetter, squareRowNumber);
            options.push(...squareOptions);
        }
        if (letter === 'p') {
            const squareOptions = AnalysisSquaresUtils.getSquaresOptionsFromSquareWithP(squareColumnLetter, squareRowNumber, color, allowPawnMove);
            options.push(...squareOptions);
        }
        if (letter === 'b') {
            const squareOptions = AnalysisSquaresUtils.getSquaresOptionsFromSquareWithB(squaresMap, squareColumnLetter, squareRowNumber, limitation);
            options.push(...squareOptions);
        }
        if (letter === 'q') {
            const squareOptionsVertHorz = AnalysisSquaresUtils.getSquaresOptionsFromSquareWithR(squaresMap, squareColumnLetter, squareRowNumber, limitation);
            const squareOptionsDiagonal = AnalysisSquaresUtils.getSquaresOptionsFromSquareWithB(squaresMap, squareColumnLetter, squareRowNumber, limitation);
            options.push(...squareOptionsVertHorz, ...squareOptionsDiagonal);
        }
        if (letter === 'k') {
            const squareOptions = AnalysisSquaresUtils.getSquaresOptionsFromSquareWithK(squareColumnLetter, squareRowNumber);
            options.push(...squareOptions);
        }
        return options;
    }

    boardSquareDangerSupportRepor(selfColor = white) {
        AnalysisSvgUtils.forceShowMarkers();

        this.drawRemoveAllMarkers();

        const squaresMap = this.boardService.getSquaresMap();
        squaresMap.forEach((squareMapValueA, squareMapKeyA) => {
            let countSupport = 0;
            let countDanger = 0;
            let note = '';
            squaresMap.forEach((squareMapValueB, squareMapKeyB) => {
                const piece = squareMapValueB;
                if (!piece) {
                    return
                }
                const squareMapSquareOptions = this.getSquarePieceAllowedSquares(squareMapKeyB);
                if (squareMapSquareOptions.includes(squareMapKeyA)) {
                    if (squareMapValueA && squareMapValueB && squareMapValueA.color === squareMapValueB.color) {
                        countSupport += 1;

                        if (squareMapValueB.letter === 'k') {
                            note = '#';
                        }

                    } else if (squareMapValueA && squareMapValueB && squareMapValueA.color !== squareMapValueB.color) {
                        countDanger += 1;
                    } else if (!squareMapValueA) {
                        if (piece.color === selfColor) {
                            countSupport += 1;
                        } else {
                            countDanger += 1;
                        }
                    }
                }
            })
            const colorType = AnalysisSvgUtils.mapNotationColorType(countSupport, countDanger, squareMapValueA, selfColor);
            AnalysisSvgUtils.addMarkerNotation(squareMapKeyA, `${note}${countSupport}-${countDanger}`, colorType);
        })
    }

    drawSupportToSquare(squareName) {
        if (!squareName) {
            return;
        }
        AnalysisSvgUtils.forceShowMarkers();

        const squaresMap = this.boardService.getSquaresMap();
        let isSquareSupported = false;
        const squarePiece = squaresMap.get(squareName);
        if (squarePiece) {
            squaresMap.forEach((squareMapValue, squareMapKey) => {
                if (squareMapKey !== squareName && squareMapValue && squareMapValue.color === squarePiece.color) {
                    const squareMapSquareOptions = this.getSquarePieceAllowedSquares(squareMapKey);
                    // console.debug('[CHESS] drawSupportToSquare: mapOptions', squareMapSquareOptions);
                    if (squareMapSquareOptions.includes(squareName)) {
                        isSquareSupported = true;
                        const markerIdByColor = AnalysisSvgUtils.getMarkerCircleIdByColor(squareMapValue.color);
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

    drawDangerToSquareDomain(squareName) {
        if (!squareName) {
            return;
        }
        AnalysisSvgUtils.forceShowMarkers();

        const squaresMap = this.boardService.getSquaresMap();
        let isSquareSave = true;
        const squarePiece = squaresMap.get(squareName);
        if (squarePiece) {
            const squaresOptionsFromFigure = this.getSquarePieceAllowedSquares(squareName);
            squaresOptionsFromFigure.forEach(() => {
                this.drawDomainBySquare(squareName);
                squaresMap.forEach((squareMapValue, squareMapKey) => {
                    if (squareMapKey !== squareName && squareMapValue && squareMapValue.color !== squarePiece.color) {
                        const squareMapSquareOptions = this.getSquarePieceAllowedSquares(squareMapKey);
                        // console.debug('[CHESS] drawAttacksToSquareDomain: mapOptions', squareMapSquareOptions);
                        // console.debug('[CHESS] drawAttacksToSquareDomain: ??fgure', squaresOptionsFromFigure);

                        const uniques = squaresOptionsFromFigure.filter(value => squareMapSquareOptions.includes(value));
                        uniques.forEach((commonSquare) => {
                            const markerIdByColor = AnalysisSvgUtils.getMarkerCircleIdByColor(squareMapValue.color);
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

    drawDangerToSquare(squareName) {
        if (!squareName) {
            return;
        }
        AnalysisSvgUtils.forceShowMarkers();

        const squaresMap = this.boardService.getSquaresMap();
        let isSquareSave = true;
        const squarePiece = squaresMap.get(squareName);
        if (squarePiece) {
            squaresMap.forEach((squareMapValue, squareMapKey) => {
                if (squareMapKey !== squareName && squareMapValue && squareMapValue.color !== squarePiece.color) {
                    const squareMapSquareOptions = this.getSquarePieceAllowedSquares(squareMapKey);
                    // console.debug('[CHESS] drawAttacksToSquare: mapOptions', squareMapSquareOptions);
                    if (squareMapSquareOptions.includes(squareName)) {
                        isSquareSave = false;
                        const markerIdByColor = AnalysisSvgUtils.getMarkerCircleIdByColor(squareMapValue.color);
                        this.addMarkerToSquare(squareMapKey, markerIdByColor)
                        this.drawDomainBySquare(squareMapKey);
                    }
                }
            })
            if (isSquareSave) {
                this.addMarkerToSquare(squareName, 'marker-rect-ok');
            } else {
                const markerIdBySquareColor = AnalysisSvgUtils.getMarkerCircleIdByColor(squarePiece.color);
                this.addMarkerToSquare(squareName, markerIdBySquareColor);
            }
        }
    }

    drawAttackFromSquareDomain(squareName) {
        if (!squareName) {
            return;
        }
        AnalysisSvgUtils.forceShowMarkers();

        const squaresMap = this.boardService.getSquaresMap();
        const squarePiece = squaresMap.get(squareName);
        if (squarePiece) {
            const markerIdByColor = AnalysisSvgUtils.getMarkerCircleIdByColor(squarePiece.color);
            const squareOptions = this.getSquarePieceAllowedSquares(squareName);
            this.drawDomainBySquare(squareName);
            squareOptions.forEach(domainSquareName => {
                const ghostPieceInDomain = squarePiece;
                const squareNextOptions = this.getSquarePieceAllowedSquares(domainSquareName, ghostPieceInDomain);
                squareNextOptions.forEach(nextDomainSquareName => {
                    const pieceInOptionSquare = squaresMap.get(nextDomainSquareName);
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

    drawSupportToSquareDomain(squareName) {
        if (!squareName) {
            return;
        }
        AnalysisSvgUtils.forceShowMarkers();

        const squaresMap = this.boardService.getSquaresMap();
        let isSquareSupported = false;
        const squarePiece = squaresMap.get(squareName);
        if (squarePiece) {
            this.drawDomainBySquare(squareName);
            const squaresOptionsFromFigure = this.getSquarePieceAllowedSquares(squareName);
            squaresOptionsFromFigure.forEach(domainSquareName => {

                squaresMap.forEach((squareMapValue, squareMapKey) => {
                    if (squareMapKey !== squareName && squareMapValue && squareMapValue.color === squarePiece.color) {
                        const squareMapSquareOptions = this.getSquarePieceAllowedSquares(squareMapKey);
                        // console.debug('[CHESS] drawSupportToSquareDomain: mapOptions', squareMapSquareOptions);
                        // console.debug('[CHESS] drawSupportToSquareDomain: ??fgure', squaresOptionsFromFigure);
                        const uniques = squaresOptionsFromFigure.filter(value => squareMapSquareOptions.includes(value));
                        uniques.forEach((commonSquare) => {
                            const markerIdByColor = AnalysisSvgUtils.getMarkerCircleIdByColor(squareMapValue.color);
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

    drawDomainByColor(color = white) {
        const squaresMap = this.boardService.getSquaresMap();
        this.drawClearDomains(color);
        if (color) {
            this.state.isDomainWhiteOn = true;
        } else {
            this.state.isDomainBlackOn = true;
        }
        const domainClassName = AnalysisSvgUtils.getDomainClassNameByColor(color);
        const squaresInDomain = []
        squaresMap.forEach((squareEntry, squareName) => {
            if (squareEntry && squareEntry.color === color) {
                const squaresFromFigure = this.getSquarePieceAllowedSquares(squareName);
                squaresInDomain.push(...squaresFromFigure);
            }
        })
        squaresInDomain.forEach(squareName => {
            // todo: domain from map
            document.getElementById(`base-${squareName}`).classList.add(domainClassName);
        })
        return squaresInDomain;
    }

    drawDomainBySquare(squareName) {
        const squaresMap = this.boardService.getSquaresMap();
        const squarePiece = squaresMap.get(squareName);
        if (squarePiece) {
            const markerIdBySquareColor = AnalysisSvgUtils.getMarkerCircleIdByColor(squarePiece.color);
            this.addMarkerToSquare(squareName, markerIdBySquareColor);
            const squaresFromFigure = this.getSquarePieceAllowedSquares(squareName);
            squaresFromFigure.forEach(domainSquareName => {
                const classNameDomain = AnalysisSvgUtils.getDomainClassNameByColor(squarePiece.color);
                // todo: domain from map
                document.getElementById(`base-${domainSquareName}`).classList.add(classNameDomain);
            })
        }
    }

    drawClearDomains(color = white) {
        const squaresMap = this.boardService.getSquaresMap();
        if (color) {
            this.state.isDomainWhiteOn = false;
        } else {
            this.state.isDomainBlackOn = false;
        }
        const classNameColor = AnalysisSvgUtils.getDomainClassNameByColor(color);
        squaresMap.forEach((_, squareName) => {
            // todo: domain from map
            const classList = document.getElementById(`base-${squareName}`).classList;
            classList.remove(classNameColor);
        });
    }

    drawAttackFromSquare(squareName) {
        if (!squareName) {
            return;
        }
        AnalysisSvgUtils.forceShowMarkers();

        const squaresMap = this.boardService.getSquaresMap();
        const squarePiece = squaresMap.get(squareName);
        if (squarePiece) {
            const squareOptions = this.getSquarePieceAllowedSquares(squareName);
            const markerIdByColor = AnalysisSvgUtils.getMarkerCircleIdByColor(squarePiece.color);
            squareOptions.forEach(optionSquareKey => {
                const pieceInOptionSquare = squaresMap.get(optionSquareKey);
                if (pieceInOptionSquare && pieceInOptionSquare.color !== squarePiece.color) {
                    // target!
                    this.addMarkerToSquare(optionSquareKey, markerIdByColor);
                }
            })
        }
    }


    //todo 
    // drawFlankCenterDomains() {
    //     const targetRows = [6, 5, 4, 3];
    //     const classNameDomain = 'with-flank';
    //     flankC.forEach(flankCColLetter => {
    //         targetRows.forEach(row => {
    //             const squareName = Utils.getCellKey(flankCColLetter, row);
    //             document.getElementById(`base-${squareName}`).classList.add(classNameDomain);
    //         })
    //     })
    // }
    // drawRemoveLastStepMoveMarker() {
    //     this.markersMap.forEach(markerItemList => {
    //         const markerIdx = markerItemList.indexOf('marker-move-last');
    //         if (markerIdx > -1) {
    //             markerItemList.splice(markerIdx, 1);
    //         }
    //     })
    //     this.drawMarkersFromMap();
    // }

}