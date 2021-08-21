const fs = require('fs');
const del = require('del')

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)



/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    return {
        browsers: config.browsers.filter((b) => b.family === 'chromium'),
    }
}


// https://docs.cypress.io/api/plugins/writing-a-plugin#List-of-events


module.exports = (on, config) => {
    on('after:screenshot', (details) => {

        const pathImg = details.path.split('cypress\\screenshots\\')[1].replace(/\\/g, '/')

        // const line = `![${details.name}](./docs/readme-assets/features-captures/${pathImg})` + "\n"
        const line = `<img src="./docs/readme-assets/features-captures/${pathImg}" alt="${details.name}" width="200"/>` + "\n"

        fs.appendFile('cypress/screenshots/screenshots.log', line, function(err) {
            if (err) throw err;
        });

    })


    on('after:spec', (spec, results) => {
        const line = "\n"
        fs.appendFile('cypress/screenshots/screenshots.log', line, function(err) {
            if (err) throw err;
        });

    })
}