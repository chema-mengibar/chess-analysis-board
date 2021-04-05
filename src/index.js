import Chess from './js/chess.js'
// import Url from './js/utils/url.js'
import './index.scss';

// const urlParams = Url.getParamsFromUrl(window.location.href);

// let fenToLoad = null;
// if ('fen' in urlParams) {
//     fenToLoad = urlParams.fen;
// }

const configA = {
    fen: '',
    asIcon: true,
    asLines: true,
    withLimitation: true,
    flip: false
};

const chess = new Chess(configA);