const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportHeight:1366,
    viewportWidth:768,
    baseUrl:'https://phptravels.com/demo',
    chromeWebSecurity:false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
