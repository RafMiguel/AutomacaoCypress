import "./commands";
import "rgb-hex";
import "cypress-mochawesome-reporter/register";
import "cypress-if";
require("cypress-xpath");
require("cypress-iframe");
require("cypress-dark");

Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false;
});

//Remove xhr requests from log
const app = window.top;
if (!app.document.head.querySelector("[data-hide-command-log-request]")) {
    const style = app.document.createElement("style");
    style.innerHTML = ".command-name-request, .command-name-xhr { display: none }";
    style.setAttribute("data-hide-command-log-request", "");

    app.document.head.appendChild(style);
}
