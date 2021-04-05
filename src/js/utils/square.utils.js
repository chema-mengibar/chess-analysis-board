function getSquareName(colLetter, rowNumber) {
    return `${colLetter}${rowNumber}`;
}

function asMapSquare(letter, color = white) {
    if (letter) {
        return {
            letter: letter,
            color: color,
        };
    } else {
        return null
    }
}

export default {
    getSquareName,
    asMapSquare
}