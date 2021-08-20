import { getUnicodePiece } from './shared/pieces'

const testPrefix = 'ui-button_paint-attack-square'
const buttonSelector = '#button-paint-attack-square'
let targetRect;
describe('Button', () => {

    before(() => {
        cy.visit('/v2/?fen=3r2k1/b3p1p1/5p2/1P1B4/1K2P3/2N5/8/8 w KQkq - 0 1')
        cy.globalCss()
        cy.addCanvas(360, 740)

    })

    beforeEach(() => {
        cy.viewport(360, 740);
    })

    it('should scroll to button, mark and take screenshot', () => {
        cy.get(buttonSelector).scrollIntoView({ timeout: 200, offset: { top: -100, left: 0 } });

        cy.get(buttonSelector).invoke('attr', 'class', 'demo-test')

        cy.screenshot(`${testPrefix}_button`);

        cy.get('.chess-board').then($el => {
            targetRect = $el[0].getBoundingClientRect()
        })
    })

    it('board caption before click', () => {
        cy.screenshot(`${testPrefix}_0-before`, {
            clip: {
                x: targetRect.x,
                y: targetRect.y,
                width: targetRect.width,
                height: targetRect.height
            }
        })
    })

    it(`should click the cta button`, () => {
        cy.get('g.square[data-square="d8"]').click({ scrollBehavior: false, force: true });
        cy.get(buttonSelector).click({ scrollBehavior: false, force: true });
    })

    it('board caption after click', () => {
        cy.screenshot(`${testPrefix}_1-after`, {
            clip: {
                x: targetRect.x,
                y: targetRect.y,
                width: targetRect.width,
                height: targetRect.height
            }
        })
    })

    it(`should explain functionality`, () => {

        cy.get('g.square[data-square="d8"]').then($el => {
            const squareRectOrg = $el[0].getBoundingClientRect()
            cy.get('g.square[data-square="d5"]').then($el => {
                const squareRectTarget = $el[0].getBoundingClientRect()
                cy.drawArrow(squareRectOrg.x, squareRectOrg.y, squareRectTarget.x, squareRectTarget.y, squareRectOrg.width)
            })
        })
        cy.screenshot(`${testPrefix}_1-explanation`, {
            clip: {
                x: targetRect.x,
                y: targetRect.y,
                width: targetRect.width,
                height: targetRect.height
            }
        })
    })

    it(`should test action functionality`, () => {

        cy.get('#markers-d5').children().first().should('to.have.attr', 'href', '#marker-circle-black');

    })
})