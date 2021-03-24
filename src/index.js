import Chess from './js/Chess.js'
import './index.scss';

const fens = [
    '5k2/ppp5/4P3/3RBr1p/3Q2P1/1K2Nr2/PP3P2/8 b - - 1 32',
    'rn2k1r1/ppp1pp1p/3p2p1/5bn1/P7/2N2B2/1PPPPP2/2BNK1RR  b - - 1 32',
    'rnbqkbnr/pp3ppp/2ppp3/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    'Rr6/8/3B4/ppPpq2k/4P1K1/8/8/8 w KQkq - 0 1',
    'r3kb1r/ppp1n1pp/2nB1p2/3p4/3P2b1/2P2N2/PP1NQPPP/R3KB1R xx',
    '8/8/8/2n3N1/8/8/8/3R4 xx', // onDomainAttacksSquare feature example
    '8/8/8/2n3N1/8/8/4n3/2R5 xx', // onAttacksSquare feature example
]

const configA = {
    fen: fens[4],
    asIcon: true,
    asLines: true,
    withLimitation: true,
    flip: false
}


const chess = new Chess(configA)