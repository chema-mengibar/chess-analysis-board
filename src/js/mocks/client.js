import { JSDOM } from "jsdom"
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window

jest.spyOn(document, 'getElementById').mockImplementation(() =>
    ({
        addEventListener: () => {},
        classList: {
            add: () => {},
            contains: () => {},
            remove: () => {},
        }
    })
)