import "./commands";
import "cypress-mochawesome-reporter/register";
import "cypress-if";
require("cypress-xpath");
require("cypress-iframe");
require("cypress-dark");

Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
});
