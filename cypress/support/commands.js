import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";
import { elDemo } from "./elementos";
addMatchImageSnapshotCommand();

Cypress.Commands.add("limpar", () => {
  cy.xpath(elDemo.campo_first_name).clear({ force: true });
  cy.xpath(elDemo.campo_last_name).clear({ force: true });
  cy.xpath(elDemo.campo_business).clear({ force: true });
  cy.xpath(elDemo.campo_email).clear({ force: true });
});
