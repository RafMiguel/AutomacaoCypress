export const ElementosLogin = {
  campo_username: '[data-test="username"]',
  campo_senha: '[data-test="password"]',
  btn_login: '[data-test="login-button"]',
  erro_login: '[data-test="error"]',
  msg_erro_login: ".error-message-container",
};

export const ElementosProdutos = {
  titulo_produto: ".title",
  lista_categorizacao: ".product_sort_container",
  container_produto: ".inventory_item_label",
  ordem_produto_az: "#item_4_title_link",
  ordem_produto_za: "#item_3_title_link",
  ordem_preco_lohi: "#item_2_title_link",
  ordem_preco_hilo: "#item_5_title_link",
  preco_produto:
    "#inventory_container > div > div:nth-child(1) > div.inventory_item_description > div.pricebar > div",
  nome_produto: ".inventory_item_name",
  carrinho: ".shopping_cart_badge",
  //Botões de adicionar e remover do carrinho
  btn_add_to_cart: "#add-to-cart-sauce-labs-backpack",
  btn_remove: "#remove-sauce-labs-backpack",
};
