import rgbHex from "rgb-hex";
import { ElementosProdutos } from "./elementos.cy";

const elLogin = require("./elementos.cy").ElementosLogin;
const elProdutos = require("./elementos.cy").ElementosProdutos;

export class Metodos {
  acessarURL() {
    cy.visit("https://www.saucedemo.com/");
  }

  digitar(elemento, texto) {
    cy.get(elemento).type(texto);

    //Mensagens de erro
    //cy.get(elLogin.erro_login).should('have.attr', tipo_attr).should('eq', valor_attr)
    //cy.get(elLogin.msg_erro_login).should('have.text', msg_erro)
  }

  validar_attr(elemento, attr, valor_atributo) {
    cy.get(elemento).should("have.attr", attr, valor_atributo);
  }

  validar_texto(elemento, info_esperada) {
    cy.get(elemento).should("have.text", info_esperada);
  }

  validar_ordenacao_produto_por_nome(
    elemento_box_produto,
    elemento_ordem_produto,
    elemento_nome_produto,
    tipo_attr,
    value_attr,
    info_produto
  ) {
    cy.get(elemento_box_produto).within(() => {
      cy.get(elemento_ordem_produto)
        .should("have.attr", tipo_attr, value_attr)
        .within(() => {
          cy.get(elemento_nome_produto).should("contain.text", info_produto);
        });
    });
  }

  validar_cor(elemento, attr_cor, hex_esperado) {
    cy.get(elemento)
      .invoke("css", attr_cor)
      .then((color) => {
        expect(rgbHex(color)).to.eql(hex_esperado);
      });
  }

  clicar(elemento) {
    cy.get(elemento).click();
  }

  deletar(elemento) {
    cy.get(elemento).clear();
  }

  escolher_opcao_lista(elemento, opcao) {
    cy.get(elemento).select(opcao);
  }
}

export default new Metodos(); //Assim a classe Login poderá ser utilizada em outras páginas
