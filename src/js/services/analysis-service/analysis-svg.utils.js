import { rows, cols, white, boardSize } from '../../utils/chess.constants.js';
import SquareUtils from '../../utils/square.utils.js';

function mapNotationColorType(
    countSupport,
    countDanger,
    squarePiece,
    targetColor = white
) {
    let colorType = 'default';

    if (countDanger === 0 && countSupport > 0 &&
        ((squarePiece && squarePiece.color !== targetColor))
    ) {
        colorType = 'advice';
    }
    if (countSupport > countDanger &&
        ((squarePiece && squarePiece.color !== targetColor))
    ) {
        colorType = 'advice';
    }
    if ((countDanger > 0 && countSupport === 0) || (countDanger > countSupport)) {
        colorType = 'alert';
    }
    if (countDanger === 0 && countSupport === 0 && !squarePiece) {
        colorType = 'neutral';
    }
    if (countDanger === countSupport && squarePiece && squarePiece.color === targetColor) {
        colorType = 'alert';
    }
    if (countSupport > countDanger &&
        ((squarePiece && squarePiece.color === targetColor) || !squarePiece)
    ) {
        colorType = 'ok';
    }

    return colorType;
}

function toggleShowMarkersContainer() {

    const markersItems = document.querySelectorAll('.markers');
    const invisibleClassName = 'marker-invisible';
    markersItems.forEach(markerItem => {
        if (markerItem.classList.contains(invisibleClassName)) {
            markerItem.classList.remove(invisibleClassName);
        } else {
            markerItem.classList.add(invisibleClassName);
        }
    });
}

function forceShowMarkers() {
    const markersItems = document.querySelectorAll('.markers');
    const invisibleClassName = 'marker-invisible';
    markersItems.forEach(markerItem => {
        if (markerItem.classList.contains(invisibleClassName)) {
            markerItem.classList.remove(invisibleClassName);
        }
    });
}

function getMarkerCircleIdByColor(color) {
    return color ? 'marker-circle-white' : 'marker-circle-black';
}

function getDomainClassNameByColor(color) {
    return color ? 'with-domain-white' : 'with-domain-black';
}

function addMarkerNotation(squareName, text, type = 'default') {

    const div = boardSize / 8;

    const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const textNode = document.createTextNode(text);
    textEl.setAttribute('x', `${div}%`);
    textEl.setAttribute('y', '0');
    textEl.setAttribute('dx', '-0.5');
    textEl.setAttribute('dy', '3');
    textEl.setAttribute('data-square', `${squareName}`);
    textEl.setAttribute('class', `marker-square-notation ${type}`);
    textEl.setAttribute('text-anchor', 'end');
    textEl.appendChild(textNode);

    const squareNode = document.getElementById(`markers-${squareName}`);
    squareNode.appendChild(textEl);
}

function addMarkerRect(squareName, type = true) {
    let typeMarker = type ? 'ok' : 'error';
    const squareNode = document.getElementById(`markers-${squareName}`);
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute('href', `#marker-rect-${typeMarker}`);
    use.setAttribute('data-square', `${squareName}`);
    squareNode.appendChild(use);
}

function addMarkerCircle(squareName, type = null) {
    let typeMarker = 'neutral'
    if (type === white) {
        typeMarker = 'white';
    } else if (type === false) {
        typeMarker = 'black';
    }
    const squareNode = document.getElementById(`markers-${squareName}`);
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute('href', `#marker-circle-${typeMarker}`);
    use.setAttribute('data-square', `${squareName}`);
    squareNode.appendChild(use);
}

function drawMarkerInSquare(squareName, markerId) {
    switch (markerId) {
        case 'marker-circle-white':
            addMarkerCircle(squareName, true);
            break;
        case 'marker-circle-neutral':
            addMarkerCircle(squareName);
            break;
        case 'marker-circle-black':
            addMarkerCircle(squareName, false);
            break;
        case 'marker-move-last':
            addMarkerMoveLast(squareName);
            break;
        case 'marker-rect-ok':
            addMarkerRect(squareName, true);
            break;
        case 'marker-rect-error':
            addMarkerRect(squareName, false);
            break;
        default:
            break;
    }
}

function removeSquareMarkers(squareName) {
    const children = document.getElementById(`markers-${squareName}`).children;
    // Change live list, iterate reverse order
    for (var i = children.length - 1; i >= 0; --i) {
        children[i].remove();
    }
}

function createMarkersMap() {
    const listCells = [];
    rows.forEach((row) => {
        cols.forEach((col) => {
            const cellKey = SquareUtils.getSquareName(col, row);
            listCells.push([cellKey, []]);
        })
    })
    return new Map(listCells);
}

function addMarkerMoveLast(squareName) {
    const squareNode = document.getElementById(`markers-${squareName}`);
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute('href', `#marker-move-last`);
    use.setAttribute('data-square', `${squareName}`);
    squareNode.appendChild(use);
}


export default {
    mapNotationColorType,
    toggleShowMarkersContainer,
    getMarkerCircleIdByColor,
    getDomainClassNameByColor,
    addMarkerNotation,
    addMarkerRect,
    addMarkerCircle,
    drawMarkerInSquare,
    removeSquareMarkers,
    createMarkersMap,
    addMarkerMoveLast,
    forceShowMarkers
}