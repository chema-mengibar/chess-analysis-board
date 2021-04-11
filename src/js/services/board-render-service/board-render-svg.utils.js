import SquareUtils from '../../utils/square.utils.js';
import { white, boardSize } from '../../utils/chess.constants.js';

function createSquare(squareLetter, colIdx, rowInt, rowIdx, config) {

    const squareName = SquareUtils.getSquareName(squareLetter, rowInt);

    const asIcon = config.asIcon;
    const div = config.svg.div;

    const x = div * colIdx;
    const y = div * rowIdx;

    let xT = 0;
    const yT = 0;

    let fontSize = (boardSize / 8) * 0.6;
    if (asIcon) {
        fontSize = (boardSize / 8) * 0.8;
    }

    const dyT = asIcon ? div / 1.2 : div / 1.5;
    const dxT = div / 2; // asIcon ? 0 : 0;

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
          text-anchor="middle" 
          x="${xT}" 
          y="${yT}" 
          dy="${dyT}"
          dx="${dxT}"
          font-size="${fontSize}"
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


function setPieceInSquare(squareName, pieceLetter = '', color = white) {
    const squareNode = document.getElementById(`piece-${squareName}`);
    const className = color ? 'white' : 'black';
    squareNode.classList.add(className);
    const notClassName = color ? 'black' : 'white';
    if (color && squareNode.classList.contains(notClassName)) {
        squareNode.classList.remove(notClassName);
    }
    squareNode.textContent = pieceLetter;
}

export default {
    createSquare,
    setPieceInSquare
}