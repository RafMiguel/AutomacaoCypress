// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {
  ElementosProdutos,
  ElementosCarrinho,
  ElementosCheckout,
  ElementosFinish,
} from "./pages/login/elementos.cy";

Cypress.Commands.add("refazer_compra", () => {
  cy.get(ElementosCheckout.btn_cancelar).click();
  cy.get(ElementosProdutos.btn_add_to_cart).click();
  cy.get(ElementosProdutos.btn_carrinho).click();
  cy.get(ElementosCarrinho.btn_checkout).click();
  cy.get(ElementosCheckout.campo_first_name).type("Raphael");
  cy.get(ElementosCheckout.campo_last_name).type("Kenway");
  cy.get(ElementosCheckout.campo_postal_code).type("0001");
  cy.get(ElementosCheckout.btn_continuar).click();
});

Cypress.Commands.add("validar_imagem_saucelabs", () => {
  cy.xpath(ElementosFinish.imagem_saucelabs)
    .should("have.attr", "alt", "Pony Express")
    .should("have.attr", "src", "/static/media/pony-express.46394a5d.png");
});
