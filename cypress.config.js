const { defineConfig } = require("cypress");
const {
  addMatchImageSnapshotPlugin,
} = require("cypress-image-snapshot/plugin");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 2280,
    viewportHeight: 1800,
    baseUrl: "https://phptravels.com/",
    chromeWebSecurity: false,

    videosFolder: "cypress/validation/videos",
    screenshotsFolder: "cypress/validation/screenshots",
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/validation/report",
      reportFilename: "phptravels",
      overwrite: false,
      html: true,
      json: true,
      timestamp: "dd-mm-yyyy_HH-MM",
    },
  },
  setupNodeEvents(on, config) {
    addMatchImageSnapshotPlugin(on, config);

    // implement node event listeners here
  },
});
