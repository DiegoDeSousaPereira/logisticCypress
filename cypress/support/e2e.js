// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })
// Import commands.js using ES2015 syntax:
import 'cypress-plugin-api'

require('cypress-plugin-api')
import './commandsStress'
import './releaseExpedition'
import 'cypress-file-upload'
import './routeSave'
import './businessScreen'
import './helperScreen'
import './driverScreen'
import './vehicleScreen'
import './releaseForecast'
import './ocurrenceScreen'
import './valueScreen'
import './login'
import './expedition'
import './globals'
import './clicks'
import './v2Screen'
// Alternatively you can use CommonJS syntax:
// require('./commands')
