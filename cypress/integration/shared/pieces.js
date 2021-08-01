export const pieces = {
    r: "265C",
    n: "265E",
    b: "265D",
    q: "265B",
    k: "265A",
    p: "265F",

    R: "2656",
    N: "2658",
    B: "2657",
    Q: "2655",
    K: "2654",
    P: "2659",
}

export function getUnicodePiece(letter) {
    return String.fromCharCode("0x" + pieces[letter])
}