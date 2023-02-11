import { elDemo, elLogin } from "./elementos";

Cypress.Commands.add("limpar", () => {
    cy.xpath(elDemo.campo_first_name).clear({ force: true });
    cy.xpath(elDemo.campo_last_name).clear({ force: true });
    cy.xpath(elDemo.campo_business).clear({ force: true });
    cy.xpath(elDemo.campo_email).clear({ force: true });
});

Cypress.Commands.add("shot", (nome) => {
    cy.wait(400).screenshot(nome, { capture: "runner", overwrite: true });
});

Cypress.Commands.add("rota", (urlBase) => {
    cy.visit("https://phptravels" + urlBase);
});

Cypress.Commands.add("login", (email, senha) => {
    cy.get(elLogin.form).first().type(email, { force: true });
    cy.get(elLogin.form).eq(1).type(senha, { force: true });
    cy.xpath(elLogin.botao_login).click({ force: true }).wait(3000);
    cy.get("h2").should("contain.text", "Hi, Raphael Welcome Back");
    cy.xpath(elLogin.language).click({ force: true });
    cy.get(elLogin.select_lang)
        .children()
        .contains("English")
        .click({ force: true })
        .should("have.text", " English");
});

/*
Cypress.Commands.add("login", (email, senha) => {
    cy.clearCookies();
    cy.xpath(elLogin.language).click({ force: true });
    cy.get(elLogin.select_lang)
        .children()
        .contains("English")
        .click({ force: true })
        .should("have.text", " English");
    cy.xpath(elLogin.menu_account).click({ force: true });
    cy.get(elLogin.select_account)
        .children()
        .contains("Customer Login")
        .click({ force: true })
        .should("have.text", "Customer Login");
    cy.get(elLogin.form).first().type(email, { force: true });
    cy.get(elLogin.form).eq(1).type(senha, { force: true });
    cy.xpath(elLogin.botao_login).click({ force: true });
    cy.get("h2").should("contain.text", "Hi, Raphael Welcome Back");
});
*/
