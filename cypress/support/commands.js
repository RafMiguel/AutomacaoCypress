import rgbHex from "rgb-hex";
import { elDemo, elLogin } from "./elementos";
import date from "./date";

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

Cypress.Commands.add("custom_url", () => {
    cy.visit(
        "https://phptravels.net/hotels/en/usd/singapore/" +
            date.nine_days_before_today() +
            "/" +
            date.today() +
            "/1/3/0/US"
    );
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

Cypress.Commands.add("box_air_india", () => {
    cy.get("h3").eq(6);
});

Cypress.Commands.add("search_hotel_by_city", (type_city, select_city) => {
    cy.get(".main_search.contact-form-action").get(".row.g-1").first();
    cy.get(".input-items")
        .find('span[role="textbox"]')
        //.should("have.attr", "title", " Search by City")
        .click({ force: true });
    cy.get(".select2-search__field").should("be.visible").type(type_city, { force: true });
    cy.xpath(".//li[@data-select2-id]", { timeout: 15000 })
        .should("be.visible")
        .and("have.text", select_city)
        .click({ force: true });
});

Cypress.Commands.add("real_date", () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;
    return today;
});

Cypress.Commands.add("color_check", (element, color_attr, color_hex) => {
    cy.get(element)
        .invoke("css", color_attr)
        .then((color) => {
            expect(rgbHex(color)).to.eq(color_hex, "Color expected");
        });
});

Cypress.Commands.add("color_check_xpath", (element, color_attr, color_hex) => {
    cy.xpath(element)
        .invoke("css", color_attr)
        .then((color) => {
            expect(rgbHex(color)).to.eq(color_hex, "Color expected");
        });
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
