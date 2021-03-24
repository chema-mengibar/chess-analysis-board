import { white, } from './chess-const.js'
import Utils from './chess-utils.js';

const boardSize = 90;
const div = (boardSize / 8);

function drawArrowInSquares(squareFrom, squareTo) {
    // @todo
    // col and row index
    // calculate x,y origin and target
    // marker selection, color, etc..
    // draw line

    /* Example: 
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 100">
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
            refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" />
            </marker>
        </defs>
        <line x1="0" y1="50" x2="250" y2="50" stroke="#000" 
        stroke-width="8" marker-end="url(#arrowhead)" />
    </svg>
    */
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

function removeSquareMarkers(squareName) {
    const children = document.getElementById(`markers-${squareName}`).children;
    // Change live list, iterate reverse order
    for (var i = children.length - 1; i >= 0; --i) {
        children[i].remove();
    }
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

function addMarkerRect(squareName, type = true) {
    let typeMarker = type ? 'ok' : 'error';
    const squareNode = document.getElementById(`markers-${squareName}`);
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute('href', `#marker-rect-${typeMarker}`);
    use.setAttribute('data-square', `${squareName}`);
    squareNode.appendChild(use);
}

function addMarkerMoveLast(squareName) {
    const squareNode = document.getElementById(`markers-${squareName}`);
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute('href', `#marker-move-last`);
    use.setAttribute('data-square', `${squareName}`);
    squareNode.appendChild(use);
}

function addMarkerNotation(squareName, text) {
    const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const textNode = document.createTextNode(text);
    textEl.setAttribute('x', `${div}%`);
    textEl.setAttribute('y', '0');
    textEl.setAttribute('dy', '3');
    textEl.setAttribute('data-square', `${squareName}`);
    textEl.setAttribute('class', 'marker-square-notation');
    textEl.setAttribute('text-anchor', 'end');
    textEl.appendChild(textNode);

    const squareNode = document.getElementById(`markers-${squareName}`);
    squareNode.appendChild(textEl);
}


function createSquare(squareLetter, colIdx, rowInt, rowIdx, asIcon = true) {

    const squareName = Utils.getCellKey(squareLetter, rowInt);

    const x = div * colIdx;
    const y = div * rowIdx;

    const xT = asIcon ? 1.5 : 4;
    const yT = asIcon ? -1.5 : 8;
    const dyT = asIcon ? 10 : 0;

    const content = `
        <title>${squareName}</title>
        <rect id="base-${squareName}" 
            data-square="${squareName}"
            class="base" 
            width="${div}%" 
            height="${div}%"  />
        <g id="markers-${squareName}" 
            data-square="${squareName}"
            class="markers" 
            width="${div}%" 
            height="${div}%"  
            fill="transparent"
            />
        <text id="piece-${squareName}" 
            data-square="${squareName}"
            class="piece ${ asIcon ? 'asIcon' : ''}" 
            text-anchor="start" 
            x="${xT}" 
            y="${yT}" 
            dy="${dyT}"
         ></text>
    `;

    const squareEl = document.createElementNS("http://www.w3.org/2000/svg", "g");
    squareEl.setAttribute('class', 'square');
    squareEl.setAttribute('id', `${squareName}`);
    squareEl.setAttribute('data-square', `${squareName}`);
    squareEl.setAttribute('data-square-col', `${squareLetter}`);
    squareEl.setAttribute('data-square-row', `${rowInt}`);
    squareEl.setAttribute('transform', `translate(${x},${y})`);

    squareEl.innerHTML = content;
    return squareEl;
}

function setPieceInSquare(squareName, pieceLetter = '', color = true) {
    const squareNode = document.getElementById(`piece-${squareName}`);
    const className = color ? 'white' : 'black';
    squareNode.classList.add(className);
    const notClassName = color ? 'black' : 'white';
    if (color && squareNode.classList.contains(notClassName)) {
        squareNode.classList.remove(notClassName);
    }
    squareNode.textContent = pieceLetter;
}

function createCoordinates(flipedRows, flipedCols) {
    const elements = [];
    flipedCols.forEach((col, idx) => {
        const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const textNode = document.createTextNode(col);
        textEl.setAttribute('x', `${div*idx}%`);
        textEl.setAttribute('y', '0');
        textEl.setAttribute('dy', '0');
        textEl.setAttribute('dx', '1');
        textEl.setAttribute('data-coord-col', `${col}`);
        textEl.setAttribute('class', 'board-coordinate board-coordinate-col');
        textEl.setAttribute('text-anchor', 'start');
        textEl.appendChild(textNode);

        elements.push(textEl);
    })

    flipedRows.forEach((row, idx) => {
        const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const textNode = document.createTextNode(row);
        textEl.setAttribute('x', '0');
        textEl.setAttribute('y', `${div*idx}%`);
        textEl.setAttribute('dy', '6');
        textEl.setAttribute('dx', '-3');
        textEl.setAttribute('data-coord-row', `${row}`);
        textEl.setAttribute('class', 'board-coordinate board-coordinate-row');
        textEl.setAttribute('text-anchor', 'start');
        textEl.appendChild(textNode);

        elements.push(textEl);
    })
    return elements;
}

export default {
    addMarkerCircle,
    addMarkerRect,
    addMarkerMoveLast,
    addMarkerNotation,
    createSquare,
    setPieceInSquare,
    createCoordinates,
    removeSquareMarkers,
    drawArrowInSquares,
    toggleShowMarkersContainer
}

/*
Svg.addMarkerCircle('e6', white);
Svg.addMarkerRect('a1');
Svg.addMarkerMoveLast('a2');
Svg.addMarkerRect('e6', false);
Svg.addMarkerNotation('f1', '??');
*/