// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('accentElement', (itemSelector) => {
    cy.get(itemSelector).then($button => {
        $button.css('outline', '3px dotted #02f513')
        $button.css('outline-offset', '5px')
        $button.css('z-index', '99999')
    });

})



Cypress.Commands.add('captureButton', (buttonSelector, testPrefix) => {
    cy.get(buttonSelector).scrollIntoView({ timeout: 200, offset: { top: -100, left: 0 } });
    cy.get(buttonSelector).then($el => {
        const buttonRect = $el[0].getBoundingClientRect()
        cy.screenshot(`${testPrefix}_button-alone`, {
            clip: {
                x: buttonRect.x,
                y: buttonRect.y,
                width: buttonRect.width,
                height: buttonRect.height
            }
        })
    })


})




Cypress.Commands.add('globalCss', () => {
    console.log('[COMMAND] globalCss')
    cy.document().then(doc => {
        var head = doc.getElementsByTagName('HEAD')[0];
        var link = doc.createElement('link');

        // set the attributes for link element 
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'http://motuo.info/chess/cy/cy.css';
        head.appendChild(link);
    })
})


Cypress.Commands.add('addCanvas', (w, h) => {

    cy.document().then(doc => {
        let canvas = doc.createElement("CANVAS");
        canvas.id = 'demoCanvas';
        canvas.width = w;
        canvas.height = h;
        doc.body.appendChild(canvas)
    })
})



function canvas_arrow(context, fromx, fromy, tox, toy, r) {
    var x_center = tox;
    var y_center = toy;

    var angle;
    var x;
    var y;

    context.beginPath();

    angle = Math.atan2(toy - fromy, tox - fromx)
    x = r * Math.cos(angle) + x_center;
    y = r * Math.sin(angle) + y_center;

    context.moveTo(x, y);

    angle += (1 / 3) * (2 * Math.PI)
    x = r * Math.cos(angle) + x_center;
    y = r * Math.sin(angle) + y_center;

    context.lineTo(x, y);

    angle += (1 / 3) * (2 * Math.PI)
    x = r * Math.cos(angle) + x_center;
    y = r * Math.sin(angle) + y_center;

    context.lineTo(x, y);

    context.closePath();

    context.fill();
}



Cypress.Commands.add('drawArrow', (fromx, fromy, tox, toy, delta) => {

    cy.document().then(doc => {
        var can = doc.getElementById('demoCanvas');
        var ctx = can.getContext('2d');

        ctx.lineWidth = 7;
        ctx.strokeStyle = '#02f513';
        ctx.fillStyle = '#02f513'; // for the triangle fill
        ctx.lineJoin = 'butt';

        const _fromx = fromx + (delta / 2)
        const _fromy = fromy + (delta / 2)
        const _tox = tox + (delta / 2)
        const _toy = toy + (delta / 2)

        ctx.beginPath();
        ctx.moveTo(_fromx, _fromy);
        ctx.lineTo(_tox, _toy);
        ctx.stroke();

        canvas_arrow(ctx, _fromx, _fromy, _tox, _toy, 10);
    })
})