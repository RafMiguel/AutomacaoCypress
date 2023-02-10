const { defineConfig } = require("cypress");
module.exports = defineConfig({
    e2e: {
        viewportWidth: 1920,
        viewportHeight: 1080,
        chromeWebSecurity: false,
        experimentalSessionAndOrigin: true,
        testIsolation: "off",
        videosFolder: "cypress/validation/videos",
        videoCompression: false,
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
