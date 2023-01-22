import xpath from "cypress-xpath";

export const ElementosLogin = {
  campo_username: '[data-test="username"]',
  campo_senha: '[data-test="password"]',
  btn_login: '[data-test="login-button"]',
  erro_login: '[data-test="error"]',
  msg_erro_login: ".error-message-container",
};

export const ElementosProdutos = {
  titulo_pagina: ".title",
  lista_categorizacao: ".product_sort_container",
  container_produto: ".inventory_item_label",
  ordem_produto_az: "#item_4_title_link",
  ordem_produto_za: "#item_3_title_link",
  ordem_preco_lohi: "#item_2_title_link",
  ordem_preco_hilo: "#item_5_title_link",
  preco_produto:
    "#inventory_container > div > div:nth-child(1) > div.inventory_item_description > div.pricebar > div",
  nome_produto: ".inventory_item_name",
  carrinho_qtd_produtos: ".shopping_cart_badge",
  btn_carrinho: ".shopping_cart_link",
  //Botões de adicionar e remover do carrinho
  btn_add_to_cart: "#add-to-cart-sauce-labs-backpack",
  btn_remove: "#remove-sauce-labs-backpack",
};

//Página do carrinho
export const ElementosCarrinho = {
  titulo_qtd: ".cart_quantity_label",
  titulo_descricao: ".cart_desc_label",
  qtd_carrinho: ".cart_quantity",
  container_item_carrinho: ".cart_item_label",
  identificar_produto: "#item_4_title_link",
  nome_produto: ".inventory_item_name",
  descricao_produto: ".inventory_item_desc",
  container_preco: ".item_pricebar",
  preco_produto: ".inventory_item_price",
  btn_continue_shopping: "#continue-shopping",
  btn_checkout: "#checkout",
  btn_remove: './/button[text()="Remove"]',
};

//Página de checkout
export const ElementosCheckout = {
  campo_first_name: "#first-name",
  campo_last_name: "#last-name",
  campo_postal_code: "#postal-code",
  btn_cancelar: "#cancel",
  btn_continuar: "#continue",
  erro_continuar: '[data-test="error"]',
  msg_erro_continuar: ".error-message-container error",
};
