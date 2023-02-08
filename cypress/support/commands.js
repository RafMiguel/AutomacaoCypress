import { elDemo } from "./elementos";

Cypress.Commands.add("limpar", () => {
    cy.xpath(elDemo.campo_first_name).clear({ force: true });
    cy.xpath(elDemo.campo_last_name).clear({ force: true });
    cy.xpath(elDemo.campo_business).clear({ force: true });
    cy.xpath(elDemo.campo_email).clear({ force: true });
});

Cypress.Commands.add("shot", (nome) => {
    cy.wait(500).screenshot(nome, { capture: "runner", overwrite: true });
});
