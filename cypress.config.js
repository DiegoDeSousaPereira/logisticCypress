const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "33kzc6",
  viewportWidth: 1440,
  viewportHeight: 900,
  //pageLoadTimeout: 60000,
  //waitForAnimations: true,
  defaultCommandTimeout: 20000,
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'https://logistic.kdabraqa.com',
  },
  // We've imported your old cypress plugins here.
  // You may want to clean this up later by importing these.
  setupNodeEvents(on, config) {
    return require('./cypress/plugins/index.js')(on, config)
  },
})
