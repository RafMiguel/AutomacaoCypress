export const elUniversal = {
    titulo: './/h1[@class="mb-0"]',
    sub_titulo: ".mt0",
};

export const elDemo = {
    titulo_form: ".text-center.cw.tac",
    campo_first_name: './/input[@placeholder="First Name"]',
    campo_last_name: './/input[@placeholder="Last Name"]',
    campo_business: './/input[@placeholder="Business Name"]',
    campo_email: './/input[@placeholder="Email"]',
    digitos_resultado: ".df",
    primeiro_digito: "#numb1",
    segundo_digito: "#numb2",
    campo_resultado: "#number",
    botao_submit: './/button[text()="Submit"]',
    titulo_thankYou: './/h2[@class="text-center cw"]//strong[text()=" Thank you!"]',
    thanks_text: './/p[@class="text-center cw"]'
};

export const elLogin = {
    menu_account: './/div[@class="dropdown"]//button[@id="ACCOUNT"]',
    select_account: ".dropdown-menu",
    language: './/div[@class="dropdown"]//button[@type="button" and @id="languages"]',
    select_lang: ".dropdown-menu",
    form: ".form-control",
    botao_login: './/button[@type="submit"]//span[text()="Login"]'
};

export const elHome = {
    sub_titulo: './/div[@class]//p[contains(text(),"over 1.5")]',
    info_titulo: ".info__title",
    info_descricao: ".info__desc",
    taxes_fees_description: 'p[class="font-size-15"]',
    top_fligh_prices: ".price-box.d-flex.align-items-center",
    mubai_to_dubai_flight: './/h3[@class="deal__title"][contains(text(),"Mumbai")]'
};

export const elFlight = {

destination_titulo: 'h2[class="sec__title_list"]'

}

export const elHotel = {

search_hotel_title: 'h2[class="text-center"]',
calendar_checkout: '.checkout.form-control.form-control-lg.border-top-l0',
no_results: 'img[alt="no results"]',
search_by_city: './/div[@class="input-items"]//span[@role="textbox" and @title=" Search by City"]'

}
