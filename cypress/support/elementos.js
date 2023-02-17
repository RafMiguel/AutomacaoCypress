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
    home_top_menu: '.main-menu-content.w-100',
    main_title_and_desc: 'div[class="d-none d-sm-block d-lg-block d-xl-block"]',
    sub_titulo: './/div[@class]//p[contains(text(),"over 1.5")]',
    home_main_search_section: '.hero-box.hero-bg.active.p-4',
    info_titulo: ".info__title",
    info_descricao: ".info__desc",
    taxes_fees_description: 'p[class="font-size-15"]',
    airline_names: 'div[class="col-7"]',
    top_fligh_FROM_word: 'span[class="price__from mr-1"]',
    top_flight_only_prices: './/div[@class="col-7"]//span[@class="price__num"]',
    top_fligh_from_and_prices: '.price-box.d-flex.align-items-center',
    origin_destiny: '.deal__title',
    mubai_to_dubai_flight: './/h3[@class="deal__title"][contains(text(),"Mumbai")]'
};

export const elFlight = {

destination_titulo: 'h2[class="sec__title_list"]'

}

export const elHotel = {


search_hotel_title: 'h2[class="text-center"]',
search_container: '.main_search.contact-form-action',
search_labels: 'span[class="label-text"]',
travellers_label: './/div[@class="input-box"]//label[@class="label-text"][text()="Travellers"]',
calendar_checkout: '.checkout.form-control.form-control-lg.border-top-l0',
calendar_checkin: '.checkin.form-control.form-control-lg.border-top-r0',
travellers_menu_drop: '.dropdown-menu.dropdown-menu-wrap',
adults_qtd: 'input[id="adults"]',
search_btn: '#submit',
results_at_menu_bar: '.left-side-info.rtl-align-right',
no_results: 'img[alt="no results"]',
search_by_city: './/div[@class="input-items"]//span[@role="textbox" and @title=" Search by City"]',

results: {//Created 'results' json inside 'elHotel' json to separete sections

    main_container: 'section[data-ref="container"]',
    per_hotel: 'div[class="card-item card-item-list"]',
    per_hotel_name: 'h3[class="card-title"]',
    hotel_location: 'p[class="card-meta"]',
    hotel_description: 'small[style]',
    hotel_star_rating: '.stars.la.la-star',
    hotel_card_price: '.card-price',
    hotel_period: 'p[class="mb-4"]',

}

}
