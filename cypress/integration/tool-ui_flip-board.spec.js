import { getUnicodePiece } from './shared/pieces'

const testPrefix = 'ui-button_flip-board'

describe('Button flip board', () => {

    const buttonSelector = '#button-board-flip'

    let targetRect;

    before(() => {
        cy.visit('/v2/?fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
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
        cy.screenshot(`${testPrefix}_0-load`, {
            clip: {
                x: targetRect.x,
                y: targetRect.y,
                width: targetRect.width,
                height: targetRect.height
            }
        })
    })

    it(`should hav black rook in "a8"`, () => {
        cy.get('#piece-a8').should('have.text', getUnicodePiece('r'));
    })

    it(`should show an normal oriented board`, () => {
        cy.get('#svg-coordinates')
            .invoke('text')
            .should('contain', 'abcdefgh')
            .should('contain', '87654321')

        ;
    })

    it(`should reset the board`, () => {
        cy.get(buttonSelector).click({ scrollBehavior: false });
    })

    it('board caption flip', () => {
        cy.screenshot(`${testPrefix}_1-flip`, {
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


    it(`should show an flip oriented board`, () => {
        cy.get('#svg-coordinates')
            .invoke('text')
            .should('contain', 'hgfedcba')
            .should('contain', '12345678')

        ;
    })



})