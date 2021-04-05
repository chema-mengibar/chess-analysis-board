export default class Figure {
    constructor(config) {
        this.letterW = config.letterW
        this.iconW = config.iconW;
        this.letterB = config.letterB;
        this.iconB = config.iconB;
    }

    asLetter(color = true) {
        if (color) {
            return this.letterW;
        }
        return this.letterB;
    }

    asIcon(color = true) {
        if (color) {
            return this.iconW;
        }
        return this.iconB;
    }
}