import { getUnicodePiece } from './shared/pieces'

describe('Button Init-board', () => {

    const buttonSelector = '#button-init'

    let targetRect;

    before(() => {
        cy.visit('/', {
            headers: {
                'user-agent': 'Mozilla/5.0 (Linux; Android 9; SM-G950F Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.157 Mobile Safari/537.36'
            }
        })
    })

    beforeEach(() => {
        cy.viewport(360, 740);
    })


    it('should scroll to button, mark and take screenshot', () => {
        cy.get(buttonSelector).scrollIntoView({ timeout: 200, offset: { top: -100, left: 0 } });
        cy.get(buttonSelector).then($button => {
            $button.css('outline', '3px dotted #02f513')
            $button.css('outline-offset', '5px')
        });


        cy.screenshot('ui-button_init-button');

        cy.get('.chess-board').then($el => {
            targetRect = $el[0].getBoundingClientRect()
            cy.log(JSON.stringify(targetRect))
        })
    })

    it('board caption 0', () => {
        cy.screenshot('ui-button_init-board_empty', {
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
        cy.screenshot('ui-button_init-board_with-pieces', {
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