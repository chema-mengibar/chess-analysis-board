function addTextToClipboard( text ){
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

export default {
    addTextToClipboard
}
