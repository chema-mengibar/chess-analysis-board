import { getUnicodePiece } from './shared/pieces'

const testPrefix = 'ui-button_domain-black'
const buttonSelector = '#button-paint-domains-b'
let targetRect;
describe('Button', () => {

    before(() => {
        cy.visit('/v2/?fen=8/1P6/8/n2B4/8/5r2/8/8 w KQkq - 0 1')
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
        // Knight domain
        cy.get('#base-b7')
            .should('to.have.class', 'with-domain-black');

        cy.get('#base-c6')
            .should('to.have.class', 'with-domain-black');

        cy.get('#base-c4')
            .should('to.have.class', 'with-domain-black');

        cy.get('#base-b3')
            .should('to.have.class', 'with-domain-black');

        // Rook domain
        cy.get('#base-f8')
            .should('to.have.class', 'with-domain-black');

        cy.get('#base-f1')
            .should('to.have.class', 'with-domain-black');

        cy.get('#base-h3')
            .should('to.have.class', 'with-domain-black');

        cy.get('#base-a3')
            .should('to.have.class', 'with-domain-black');


    })
})