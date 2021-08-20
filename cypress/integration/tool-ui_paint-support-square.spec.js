import { getUnicodePiece } from './shared/pieces'

const testPrefix = 'ui-button_paint-support-square'
const buttonSelector = '#button-paint-support-square'
let targetRect;
describe('Button', () => {

    before(() => {
        cy.visit('/v2/?fen=3r2k1/b3p1p1/5p2/1P1B4/1K2P3/2N5/8/8 w KQkq - 0 1')
    })

    beforeEach(() => {
        cy.viewport(360, 740);
    })

    it('should scroll to button, mark and take screenshot', () => {
        cy.get(buttonSelector).scrollIntoView({ timeout: 200, offset: { top: -100, left: 0 } });
        cy.get(buttonSelector).then($button => {
            $button.css('outline', '3px dotted #02f513')
            $button.css('outline-offset', '5px')
            $button.css('z-index', '99999')
        });

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
        cy.get('g.square[data-square="d5"]').click({ scrollBehavior: false });
        cy.get(buttonSelector).click({ scrollBehavior: false });
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

    it(`should test action functionality`, () => {
        cy.get('#markers-d5').children().first().should('to.have.attr', 'href', '#marker-rect-ok');
        cy.get('#markers-c3').children().first().should('to.have.attr', 'href', '#marker-circle-white');
    })
})