import { getUnicodePiece } from './shared/pieces'

const testPrefix = 'ui-button_fen-load-board'
const buttonSelector = '#button-fen-create-board'

describe('Button load fen to board', () => {

    let targetRect;

    const targetFen = '5rk1/6b1/8/8/8/8/3P4/R3K3 w KQkq - 0 1';

    before(() => {
        cy.visit('/')
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
                // cy.log(JSON.stringify(targetRect))
        })
    })

    it('board caption 0', () => {
        cy.screenshot(`${testPrefix}_0-init`, {
            clip: {
                x: targetRect.x,
                y: targetRect.y,
                width: targetRect.width,
                height: targetRect.height
            }
        })
    })


    it(`should fen to the board`, () => {
        cy.get('#fen-input').type(targetFen, { scrollBehavior: false });
        cy.get(buttonSelector).click({ scrollBehavior: false });
    })

    it('board caption fen loaded', () => {
        cy.screenshot(`${testPrefix}_1-fen-loaded`, {
            clip: {
                x: targetRect.x,
                y: targetRect.y,
                width: targetRect.width,
                height: targetRect.height
            }
        })
    })

    it(`should have "a8" square white black rook`, () => {
        cy.get('#piece-a1').should('have.text', getUnicodePiece('R'));
        cy.get('#piece-e1').should('have.text', getUnicodePiece('K'));
        cy.get('#piece-d2').should('have.text', getUnicodePiece('P'));
        cy.get('#piece-f8').should('have.text', getUnicodePiece('r'));
        cy.get('#piece-g8').should('have.text', getUnicodePiece('k'));
        cy.get('#piece-g7').should('have.text', getUnicodePiece('b'));
    })

    it('show fen in url', () => {
        cy.url().should('include', targetFen.replace(/\s/g, '%20'))
    })

})