import { white } from '../../utils/chess.constants.js';

function addTextToClipboard(text) {
    try {
        let myTemporaryInputElement = document.createElement('input');
        myTemporaryInputElement.type = 'text';
        myTemporaryInputElement.value = text;
        document.body.appendChild(myTemporaryInputElement);
        myTemporaryInputElement.select();
        document.execCommand('Copy');
        document.body.removeChild(myTemporaryInputElement);

    } catch (e) {
        console.error('[Clipboard] addTextToClipboard:', e);
    }
}


function parsePgn(pgnStr) {
    let m;
    const regex = /([0-9]{1,2}\.)\s?([\S]+) ([\S]+)/gm;
    const registry = [];

    const pgnStrNoHeaders = pgnStr.replace(/(\[.+\])/g, '');
    const pgnStrNoBr = pgnStrNoHeaders.replace(/(?:\r\n|\r|\n)/g, ' ');

    while ((m = regex.exec(pgnStrNoBr)) !== null) {
        // avoid infinite loops
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        /*
         group 0: 16.Qd3 Bc6
         group 1: 16.
         group 2: Qd3
         group 3: Bc6
        */
        m.forEach((match, groupIndex) => {
            // console.debug(`[UTILS] parsePgn match: , group ${groupIndex}: ${match}`);
            if (groupIndex === 0) {
                // Index move
            }
            if (groupIndex === 2) {
                // Whites move

                registry.push(match);
            }
            if (groupIndex === 3) {
                // Blacks move
                registry.push(match);
            }
        });
    }

    return registry;
}


function parsePgnNotation(pgnMove, color = white) {
    /*
     * b4!
     * Sf5!?
     * Ndxf6 <<< BUG !
     * R8xf7 <<< BUG ?
     * Nxf6
     * O-O
     * O-O-O
     * exd5
     * Bc5
     * Qd2#
     * g8=Q
     * Rf7+
     * Qh8+
     * Rcc8
     * end games: 1-0, ...
     * mate #
     * */

    const pgnMoveClean1 = pgnMove.replace('#', '')
        .replace('+', '')
        .replace('?', '')
        .replace('!', '');

    // endGame case
    if (['1-0', '1:0', '0-1', '0:1', '1/2-1/2', '*'].includes(pgnMoveClean1)) {
        return [];
    }

    // Short halfMove case
    if (pgnMoveClean1 === 'O-O') {
        if (color === white) {

            return [
                { figure: 'k', squareFrom: 'e1', squareTo: 'g1', color },
                { figure: 'r', squareFrom: 'h1', squareTo: 'f1', color },
            ];
        }
        return [
            { figure: 'k', squareFrom: 'e8', squareTo: 'g8', color },
            { figure: 'r', squareFrom: 'h8', squareTo: 'f8', color },
        ];
    }

    // Long halfMove case
    if (pgnMoveClean1 === 'O-O-O') {
        if (color === white) {
            return [
                { figure: 'k', squareFrom: 'e1', squareTo: 'c1', color },
                { figure: 'r', squareFrom: 'a1', squareTo: 'd1', color },
            ];
        }
        return [
            { figure: 'k', squareFrom: 'e8', squareTo: 'c8', color },
            { figure: 'r', squareFrom: 'a8', squareTo: 'd8', color },
        ];
    }

    // Pawn promotion case: g8=Q
    if (pgnMoveClean1.indexOf('=') > -1) {
        const partsChange = pgnMoveClean1.split('=');
        return [{
            figure: 'p',
            figureToChange: partsChange[1].toLowerCase(),
            squareTo: partsChange[0],
            color
        }, ];
    }

    try {
        const regExpSquare = /([a-z]{1}[0-9]{1})/g;
        const matchSquare = regExpSquare.exec(pgnMoveClean1);

        const pgnSquareName = matchSquare[1];
        const pgnMoveClean2 = pgnMoveClean1.replace(pgnSquareName, '');

        let capture = false

        if (pgnMoveClean2.includes('x')) {
            capture = true;
        }
        // Pawn case
        if (pgnMoveClean2 === pgnMoveClean2.toLowerCase()) {
            return [{
                figure: 'p',
                squareFrom: pgnMoveClean2.replace('x', ''),
                squareTo: pgnSquareName,
                color,
                capture
            }, ];
        }

        let squareFrom = '';
        let figure = '';
        if (pgnMoveClean2.length >= 2) {
            squareFrom = pgnMoveClean2[1].replace('x', '');
            figure = pgnMoveClean2[0].toLowerCase();
        } else {
            figure = pgnMoveClean2.toLowerCase();
        }
        return [{
            figure: figure,
            squareFrom: squareFrom,
            squareTo: pgnSquareName,
            color,
            capture
        }, ];
    } catch (error) {
        throw new Error(`${error} >> ${pgnMove} ${pgnMoveClean1}`);
    }
}


export default {
    parsePgn,
    parsePgnNotation,
    addTextToClipboard
}