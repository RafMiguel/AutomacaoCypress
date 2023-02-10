/// <reference types="cypress"/>
import login from "../fixtures/custom_client.json";
import { elLogin } from "../support/elementos";

describe("Logar no PHPTravels", () => {
    before(() => {
        cy.rota(".net/");
        cy.login(login.email, login.password);
    });
    it("sds", () => {
        cy.get('a[title="flights"]').click({ force: true });
        cy.get('[type="radio"]')
            .check("return", { force: true })
            .should("be.checked")
            .get('label[for="round-trip"]')
            .should("have.text", " Round Trip");
    });
});
