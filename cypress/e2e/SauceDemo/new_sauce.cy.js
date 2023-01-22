/// <reference types="cypress" />

import { it } from "mocha";
import {
  ElementosLogin,
  ElementosProdutos,
} from "../../support/pages/login/elementos.cy";
import Metodos from "../../support/pages/login/metodos";
import rgbHex from "rgb-hex";

//Rodar classe específica de testes = npx cypress run --spec cypress/e2e/1-getting-started/sauce.cy.js

/*
"merge:reports": "mochawesome-merge mochawesome-report/*.json > cypress-combined-report.json",
"create:html:report": "npm run merge:reports && marge --reportDir TestReport cypress-combined-report.json"


npm run create:html:report

npm run test:cli

*/

//Funcionalidade geral do teste
describe("Regressivo no site saucedemo.com", () => {
  before(() => {
    cy.visit("/");
  });
  //Caso de teste

  context("Testar erros de login", () => {
    const username_err = "notepad";
    const senha_err = "visual";

    //Tentar logar apenas preenchendo o campo username
    it("Tentar logar apenas preenchendo o campo username", () => {
      Metodos.digitar(ElementosLogin.campo_username, "standard_user");
      Metodos.clicar(ElementosLogin.btn_login);
      Metodos.validar_attr(ElementosLogin.erro_login, "data-test", "error");
      Metodos.validar_texto(
        ElementosLogin.msg_erro_login,
        "Epic sadface: Password is required"
      );
      Metodos.deletar(ElementosLogin.campo_username);
    });

    it("Tentar logar apenas preenchendo o campo password", () => {
      Metodos.digitar(ElementosLogin.campo_senha, "secret_sauce");
      Metodos.clicar(ElementosLogin.btn_login);
      Metodos.validar_attr(ElementosLogin.erro_login, "data-test", "error");
      Metodos.validar_texto(
        ElementosLogin.msg_erro_login,
        "Epic sadface: Username is required"
      );
      Metodos.deletar(ElementosLogin.campo_senha);
    });
    it("Logar preenchendo username correto e senha incorreta", () => {
      Metodos.digitar(ElementosLogin.campo_username, "standard_user");
      Metodos.digitar(ElementosLogin.campo_senha, "banana");
      Metodos.clicar(ElementosLogin.btn_login);
      Metodos.validar_attr(ElementosLogin.erro_login, "data-test", "error");
      Metodos.validar_texto(
        ElementosLogin.msg_erro_login,
        "Epic sadface: Username and password do not match any user in this service"
      );
      Metodos.deletar(ElementosLogin.campo_username);
      Metodos.deletar(ElementosLogin.campo_senha);
    });

    it("Logar preenchendo username incorreto e senha correta", () => {
      Metodos.digitar(ElementosLogin.campo_username, "mosca");
      Metodos.digitar(ElementosLogin.campo_senha, "secret_sauce");
      Metodos.clicar(ElementosLogin.btn_login);
      Metodos.validar_attr(ElementosLogin.erro_login, "data-test", "error");
      Metodos.validar_texto(
        ElementosLogin.msg_erro_login,
        "Epic sadface: Username and password do not match any user in this service"
      );
      Metodos.deletar(ElementosLogin.campo_username);
      Metodos.deletar(ElementosLogin.campo_senha);
    });
  });

  context("Logar com sucesso e validar cor do botão de login", () => {
    it("Logar com username e senha corretos", () => {
      Metodos.digitar(ElementosLogin.campo_username, "standard_user");
      Metodos.digitar(ElementosLogin.campo_senha, "secret_sauce");
      Metodos.validar_cor(
        ElementosLogin.btn_login,
        "background-color",
        "e2231a"
      );
      Metodos.clicar(ElementosLogin.btn_login);
      Metodos.validar_texto(ElementosProdutos.titulo_produto, "Products");
    });
  });
});
