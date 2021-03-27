function getParamsFromUrl(url) {
    const params = {};
    let parser = document.createElement('a');
    parser.href = url;
    const query = parser.search.substring(1);
    if (!query) {
        return params;
    }
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

export default {
    getParamsFromUrl
}