import rgbHex from "rgb-hex";
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

Cypress.Commands.add(
    "istanbul_prices_column",
    (equal, font_size_one, font_weight, font_size_two, value) => {
        cy.get(".col-4.p-2")
            .find(".card-price")
            .eq(equal)
            .should("be.visible")
            .find('span[class="price__from"]')
            .should("have.text", "Start From");
        cy.get(".col-4.p-2")
            .find(".card-price")
            .eq(equal)
            .find('span[class="price__num"]')
            .find("small")
            .should("have.css", "font-size", font_size_one)
            .and("have.text", "USD");
        cy.get(".col-4.p-2")
            .find(".card-price")
            .eq(equal)
            .find('span[class="price__num"]')
            .find("strong")
            .should("have.css", "font-weight", font_weight)
            .and("have.css", "font-size", font_size_two)
            .and("have.text", value);
    }
);

Cypress.Commands.add('cookies',() =>{
    Cypress.Cookies.defaults({
        preserve: "ci_session",
        preserve: "PHPSESSID"
      })
})

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
