import { getUnicodePiece } from './shared/pieces'

const testPrefix = 'ui-button_reset-board'

describe('Button reset board', () => {

    const buttonSelector = '#button-init'

    let targetRect;

    before(() => {
        cy.visit('/')
    })

    beforeEach(() => {
        cy.viewport(360, 740);
    })


    it('should scroll to button, mark and take screenshot', () => {
        cy.get(buttonSelector).scrollIntoView({ timeout: 200, offset: { top: -100, left: 0 } });
        cy.accentElement(buttonSelector);
        cy.screenshot(`${testPrefix}_button`);
        cy.get('.chess-board').then($el => {
            targetRect = $el[0].getBoundingClientRect()
        })
    })


    it('button caption', () => {
        cy.captureButton(buttonSelector, testPrefix)
    })

    it('board caption 0', () => {
        cy.screenshot(`${testPrefix}_0-empty`, {
            clip: {
                x: targetRect.x,
                y: targetRect.y,
                width: targetRect.width,
                height: targetRect.height
            }
        })
    })

    it(`should show an empty board`, () => {
        cy.get('#piece-a8').should('have.text', '');
    })

    it(`should reset the board`, () => {
        cy.get(buttonSelector).click({ scrollBehavior: false });
    })

    it('board caption full-pieces', () => {
        cy.screenshot(`${testPrefix}_1-pieces`, {
            clip: {
                x: targetRect.x,
                y: targetRect.y,
                width: targetRect.width,
                height: targetRect.height
            }
        })
    })

    it(`should have "a8" square white black rook`, () => {
        cy.get('#piece-a8').should('have.text', getUnicodePiece('r'));
    })

    it(`should have "a7" square white black pawn`, () => {
        cy.get('#piece-a7').should('have.text', getUnicodePiece('p'));
    })

})