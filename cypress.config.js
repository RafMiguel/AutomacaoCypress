const { defineConfig } = require("cypress");
//const { config } = require("cypress/types/bluebird");

const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome",
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true,
  },

  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },

    chromeWebSecurity: false,
    //experimentalSessionAndOrigin: false,
    baseUrl: "https://www.saucedemo.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
