/// <reference types="cypress" />

import { it } from "mocha";
import {
  ElementosLogin,
  ElementosProdutos,
  ElementosCarrinho,
  ElementosCheckout,
  ElementosConfirmacao,
  ElementosFinish,
} from "../../support/pages/login/elementos.cy";
import Metodos from "../../support/pages/login/metodos.js";

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
    cy.visit("https://www.saucedemo.com/");

    Cypress.Cookies.defaults({
      preserve: "session-username",
    });
  });
  //Caso de teste

  context("Testar erros de login", () => {
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
      Metodos.validar_texto(ElementosProdutos.titulo_pagina, "Products");
    });
  });

  context("Validar categorização do produto", () => {
    it("Validar categorização do produto por nome de A-Z", () => {
      Metodos.escolher_opcao_lista(
        ElementosProdutos.lista_categorizacao,
        "az",
        "az"
      );
      Metodos.validar_ordenacao_produto_por_nome(
        ElementosProdutos.container_produto,
        ElementosProdutos.ordem_produto_az,
        ElementosProdutos.nome_produto,
        "id",
        "item_4_title_link",
        "S"
      );
    });

    it("Validar categorização do produto por nome de Z-A", () => {
      Metodos.escolher_opcao_lista(
        ElementosProdutos.lista_categorizacao,
        "za",
        "za"
      );
      Metodos.validar_ordenacao_produto_por_nome(
        ElementosProdutos.container_produto,
        ElementosProdutos.ordem_produto_za,
        ElementosProdutos.nome_produto,
        "id",
        "item_3_title_link",
        "T"
      );
    });

    it("Validar categorização do produto pelo menor preço", () => {
      Metodos.escolher_opcao_lista(
        ElementosProdutos.lista_categorizacao,
        "lohi"
      );
      Metodos.validar_texto(ElementosProdutos.preco_produto, "$7.99");
    });

    it("Validar categorização do produto pelo maior preço", () => {
      Metodos.escolher_opcao_lista(
        ElementosProdutos.lista_categorizacao,
        "hilo"
      );
      Metodos.validar_texto(ElementosProdutos.preco_produto, "$49.99");
    });
  });

  context("Validar produtos no carrinho", () => {
    it("Adicionar e remover um produto do carrinho", () => {
      Metodos.clicar(ElementosProdutos.btn_add_to_cart);
      Metodos.validar_texto(ElementosProdutos.carrinho_qtd_produtos, "1");
      Metodos.clicar(ElementosProdutos.btn_remove);
    });
  });

  context("Validar carrinho", () => {
    it("Validar estáticos na página do carrinho", () => {
      //Linha 159 = Adicionado novamente um produto no carrinho para seguir com o fluxo de pagamento
      Metodos.clicar(ElementosProdutos.btn_add_to_cart);
      Metodos.clicar(ElementosProdutos.btn_carrinho);
      Metodos.validar_texto(ElementosProdutos.titulo_pagina, "Your Cart");
      Metodos.validar_texto(ElementosCarrinho.titulo_qtd, "QTY");
      Metodos.validar_texto(ElementosCarrinho.titulo_descricao, "DESCRIPTION");
    });

    it("Validar produto na página do carrinho", () => {
      let descricao =
        "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.";
      Metodos.validar_texto(ElementosCarrinho.qtd_carrinho, "1");
      Metodos.validar_produto_pag_carrinho(
        ElementosCarrinho.container_item_carrinho,
        ElementosProdutos.ordem_produto_az,
        "id",
        "item_4_title_link",
        ElementosCarrinho.nome_produto,
        "Sauce Labs Backpack",
        ElementosCarrinho.descricao_produto,
        descricao,
        ElementosCarrinho.container_preco,
        ElementosCarrinho.preco_produto,
        "$29.99"
      );
    });
    it('Validar botões "Remove","Continue Shopping" e "Checkout"', () => {
      Metodos.clicar_xpath(ElementosCarrinho.btn_remove);
      Metodos.clicar(ElementosCarrinho.btn_continue_shopping);
      //Linhas 188 e 189 = Será adicionado novamente um produto ao carrinho para aproveitarmos a interação com o botão "Checkout" e seguir para a tela de pagamento
      Metodos.clicar(ElementosProdutos.btn_add_to_cart);
      Metodos.clicar(ElementosProdutos.btn_carrinho);
      Metodos.clicar(ElementosCarrinho.btn_checkout);
    });
  });

  context("Validar página de checkout", () => {
    it("Validar ação do botão cancelar", () => {
      Metodos.clicar(ElementosCheckout.btn_cancelar);
      //Botão cancelar volta para a página do carrinho. Para validar o funcionamento correto do botão cancelar, validaremos na linha seguinte o título da página do carrinho ("Your Cart")
      Metodos.validar_texto(ElementosProdutos.titulo_pagina, "Your Cart");
      //Após a validação do funcionamento correto do botão cancelar, nas cinco linhas seguintes iremos voltar para a página de produtos para adicionar novamente um produto no carrinho para seguirmos com a validação na página de checkout
      Metodos.clicar(ElementosCarrinho.btn_continue_shopping);
      Metodos.clicar(ElementosProdutos.btn_add_to_cart);
      Metodos.clicar(ElementosProdutos.btn_carrinho);
      Metodos.clicar(ElementosCarrinho.btn_checkout);
      Metodos.validar_texto(
        ElementosProdutos.titulo_pagina,
        "Checkout: Your Information"
      );
    });

    it("Tentar continuar inserindo apenas o primeiro nome no formulário", () => {
      Metodos.digitar(ElementosCheckout.campo_first_name, "Raphael");
      Metodos.clicar(ElementosCheckout.btn_continuar);
      Metodos.validar_attr(
        ElementosCheckout.erro_continuar,
        "data-test",
        "error"
      );
      Metodos.validar_texto(
        ElementosCheckout.erro_continuar,
        "Error: Last Name is required"
      );
    });

    it("Tentar continuar inserindo apenas o último nome no formulário", () => {
      Metodos.deletar(ElementosCheckout.campo_first_name);
      Metodos.digitar(ElementosCheckout.campo_last_name, "Kenway");
      Metodos.clicar(ElementosCheckout.btn_continuar);
      Metodos.validar_attr(
        ElementosCheckout.erro_continuar,
        "data-test",
        "error"
      );
      Metodos.validar_texto(
        ElementosCheckout.erro_continuar,
        "Error: First Name is required"
      );
    });

    it("Tentar continuar inserindo apenas o código postal no formulário", () => {
      Metodos.deletar(ElementosCheckout.campo_last_name);
      Metodos.digitar(ElementosCheckout.campo_postal_code, "0001");
      Metodos.clicar(ElementosCheckout.btn_continuar);
      Metodos.validar_attr(
        ElementosCheckout.erro_continuar,
        "data-test",
        "error"
      );
      Metodos.validar_texto(
        ElementosCheckout.erro_continuar,
        "Error: First Name is required"
      );
    });

    it("Tentar continuar inserindo apenas primeiro e último nome no formulário", () => {
      Metodos.deletar(ElementosCheckout.campo_postal_code);
      Metodos.digitar(ElementosCheckout.campo_first_name, "Raphael");
      Metodos.digitar(ElementosCheckout.campo_last_name, "Kenway");
      Metodos.clicar(ElementosCheckout.btn_continuar);
      Metodos.validar_attr(
        ElementosCheckout.erro_continuar,
        "data-test",
        "error"
      );
      Metodos.validar_texto(
        ElementosCheckout.erro_continuar,
        "Error: Postal Code is required"
      );
    });
    it("Tentar continuar inserindo apenas primeiro nome e código postal no formulário", () => {
      Metodos.deletar(ElementosCheckout.campo_last_name);
      Metodos.digitar(ElementosCheckout.campo_postal_code, "0001");
      Metodos.clicar(ElementosCheckout.btn_continuar);
      Metodos.validar_attr(
        ElementosCheckout.erro_continuar,
        "data-test",
        "error"
      );
      Metodos.validar_texto(
        ElementosCheckout.erro_continuar,
        "Error: Last Name is required"
      );
    });

    it("Tentar continuar inserindo apenas último nome e código postal no formulário", () => {
      Metodos.deletar(ElementosCheckout.campo_first_name);
      Metodos.digitar(ElementosCheckout.campo_last_name, "Kenway");
      Metodos.clicar(ElementosCheckout.btn_continuar);
      Metodos.validar_attr(
        ElementosCheckout.erro_continuar,
        "data-test",
        "error"
      );
      Metodos.validar_texto(
        ElementosCheckout.erro_continuar,
        "Error: First Name is required"
      );
    });

    it("Inserir corretamente o Primeiro e Segundo nome, e o Código Postal", () => {
      Metodos.digitar(ElementosCheckout.campo_first_name, "Raphael");
      Metodos.clicar(ElementosCheckout.btn_continuar);
    });
  });

  context("Validar página de confirmação", () => {
    it("Extra - Refazer compra (Alternativa encontrada para seguir com a validação da compra na última página)", () => {
      cy.refazer_compra();
    });

    it("Finalizar compra", () => {
      Metodos.validar_info_pagina_confirmacao(
        ElementosConfirmacao.titulo_payment_info,
        "Payment Information:",
        ElementosConfirmacao.valor_payment_info,
        "Sauce",
        ElementosConfirmacao.titulo_shipping_info,
        "Shipping Information:",
        ElementosConfirmacao.valor_shipping_info,
        "FREE PONY EXPRESS DELIVERY!",
        ElementosConfirmacao.subtitulo_valor_item,
        "Item total: $",
        ElementosConfirmacao.subtitulo_taxa_item,
        "Tax: $",
        ElementosConfirmacao.valor_total,
        "Total: $"
      );
      Metodos.validar_valor_css(
        ElementosConfirmacao.valor_total,
        "font-weight",
        "800"
      );

      Metodos.clicar_xpath(ElementosConfirmacao.btn_finish);
    });

    it("Validar página de compra finalizada", () => {
      let texto_obrigado =
        "Your order has been dispatched, and will arrive just as fast as the pony can get there!";

      Metodos.validar_texto(
        ElementosProdutos.titulo_pagina,
        "Checkout: Complete!"
      );
      Metodos.validar_texto_xpath(
        ElementosFinish.titulo_obrigado,
        "THANK YOU FOR YOUR ORDER"
      );
      Metodos.validar_texto(ElementosFinish.texto_obrigado, texto_obrigado);
      cy.validar_imagem_saucelabs();
      Metodos.clicar(ElementosFinish.btn_voltar_home);
    });

    it("Validar logout do site", () => {
      Metodos.validar_texto(ElementosProdutos.titulo_pagina, "Products");
      Metodos.clicar_xpath(ElementosProdutos.btn_abrir_menu);
      Metodos.clicar_xpath(ElementosProdutos.btn_logout);
      Metodos.validar_attr(ElementosLogin.img_swaglabs, "class", "login_logo");
    });
  });
});
