import Chess from './js/Chess.js'
import './index.scss';

// const fensExamples = [
//     '8/3b2r1/8/8/K5Q/3B4/8/8 b 1 32',
//     'rn2k1r1/ppp1pp1p/3p2p1/5bn1/P7/2N2B2/1PPPPP2/2BNK1RR  b - - 1 32',
//     'rnbqkbnr/pp3ppp/2ppp3/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
//     'Rr6/8/3B4/ppPpq2k/4P1K1/8/8/8 w KQkq - 0 1',
//     'r3kb1r/ppp1n1pp/2nB1p2/3p4/3P2b1/2P2N2/PP1NQPPP/R3KB1R xx',
//     '8/8/1N6/8/8/R3n3/8/8 xx', // onAttacksSquare feature example
// ];

const configA = {
    // fen: '',
    asIcon: true,
    asLines: true,
    withLimitation: true,
    flip: false
};

const chess = new Chess(configA);