import Chess from './js/chess.js'
import UrlUtils from './js/utils/url.js'
import './index.scss';

const urlParams = UrlUtils.getParamsFromUrl(window.location.href);

let fenToLoad = null;
if ('fen' in urlParams) {
    fenToLoad = urlParams.fen;
}

const config = {
    fen: fenToLoad,
    asIcon: true,
    // asLines: false, // todo: check param
    withLimitation: true,
    flip: false
};

new Chess(config);