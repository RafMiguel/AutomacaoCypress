/// <reference types="cypress"/>

import { elHome,
                elFlight } from "../support/elementos";

describe("Home PHPTravels", () => {

    const txt_home = 'home/home_texts.json'

    before(() => {
        cy.rota(".net/").log("Acessou site PHPTravels.net");
        
    });

    context("Estáticos da home", () => {
        it("Título - Lets book your next trip", () => {
            cy.log("Capturar elemento que contém o título -Let’s book your next trip!- e validar título");
            
            cy.get(elHome.main_title_and_desc)
                .find("strong")
                .should("have.css", "font-weight", "700")
                .and("have.text", " Let’s book your next trip!");
        });

        it("Sub título - Choose best deals over 1.5 million travel services", () => {
            cy.get(elHome.main_title_and_desc).find('p')
                .should("have.text", "Choose best deals over 1.5 million travel services");
        });

        it('Validar background da seção de título e sub-título', () => {
            cy.get(elHome.home_main_search_section).should('be.visible').as('style')
            cy.get('@style')
            .should('have.css','min-height', '600px')
            .and('have.css','background-image','url("https://phptravels.net/app/themes/default/assets/img/bg.webp")')
            .and('have.css','background-attachment','fixed')
        });

        it("Validar texto, descrição e posição da coluna - 'You never roam alone'", () => {
        
            
            cy.get(elHome.info_titulo).contains('never roam alone').as('never_roam_alone').invoke('text').then((actual) =>{
                cy.fixture(txt_home)
                .then((to_be) =>{
                    expect(actual).to.deep.eq(to_be.never_roam_alone)
                    cy.get(elHome.info_titulo).first()
                    .should('have.text', to_be.never_roam_alone)
                })
        
            })
            cy.get(elHome.info_descricao)
            .contains('travel services')
            .invoke('text')
            .then((actual) =>{
                cy.fixture(txt_home)
                .then((to_be) =>{
                    expect(actual).to.deep.contains(to_be.find_best_travel)
                    cy.log('**_P.S: Tons of whitespaces in the current description text_**')
                    cy.get(elHome.info_descricao).first()
                    .should('contain.text', to_be.find_best_travel)
                })
                cy.shot('Home - Whitespaces in class "p.info_desc"')
            })

        });

        it("Validar texto, descrição e posição da coluna - Travel to anytime, anywhere", () => {
            cy.get(elHome.info_titulo)
            .contains('anytime, anywhere')
            .invoke('text')
            .then((actual) =>{

                cy.fixture(txt_home)
                .then((to_be) =>{
                    expect(actual).to.deep.eq(to_be.travel_anytime)
                    cy.get(elHome.info_titulo).eq(1,'**_second element from class_**')
                    .should('have.text',to_be.travel_anytime)
                })
            })
                
                cy.get(elHome.info_descricao)
                .contains('No limits and boundaries ')
                .invoke('text')
                .then((actual) =>{
                    cy.fixture(txt_home)
                    .then((to_be) =>{
                        expect(actual).to.deep.contains(to_be.no_limits)
                        cy.log('**_P.S: Tons of whitespaces in the current description text_**')
                        cy.get(elHome.info_descricao).eq(1,'**_second element from class_**')
                        .should('contain.text',to_be.no_limits)
                    })
                })
                
        });

        it("Validar texto, descrição e posição da coluna - Ease of mind, search filter and book", () => {
            cy.get(elHome.info_titulo)
            .contains('Ease of mind')
            .invoke('text')
            .then((actual) =>{
                cy.fixture(txt_home)
                .then((to_be) =>{
                    expect(actual).to.deep.eq(to_be.ease_of_mind)
                cy.get(elHome.info_titulo).eq(2, '**_third element from class_**')
                .should('have.text',to_be.ease_of_mind)
                })
            })

            cy.get(elHome.info_descricao)
            .contains("Let's help you")
            .invoke('text')
            .then((actual) =>{
                cy.fixture(txt_home)
                .then((to_be) =>{
                    expect(actual).to.deep.contains(to_be.lets_help)
                    cy.log('**_P.S: Tons of whitespaces in the current description text_**')
                cy.get(elHome.info_descricao).eq(2, '**_third element from class_**')
                .should('contain.text', to_be.lets_help)
                })
            })
        });

    });

    context("Top Flights Destination", () => {
        it('Validar título "Top Flight Destinations" e sua cor', () => {
            cy.get("h2").eq(1).as('top_flight_title')
            .should("be.visible")
            .invoke('text')
            .then((actual) =>{
                cy.fixture(txt_home)
                .then((to_be) =>{
                    expect(actual).to.deep.eq(to_be.top_flight)
                })
            })

            cy.color_check('@top_flight_title','color','0d233e')

        });

        context('Top Flights Destination (Tabela) - Validar cores e parâmetros (texto)', () => {
            it('Validar cor dos nomes das linhas aéreas', () => {
                cy.color_check(elHome.airline_names,'color','1062fe')
    });

            it('Validar cor de Origem → Destino', () => {
                cy.color_check(elHome.origin_destiny,'color','0d233e')

    });

            it('Validar cor da palavra "From"', () => {
                cy.color_check(elHome.top_fligh_FROM_word,'color','1062fe')
            });

            it('Validar cor e propriedade da classe de preços na tabela', () => {
                cy.color_check_xpath(elHome.top_flight_only_prices,'color','0d233e')
                cy.xpath(elHome.top_flight_only_prices)
                .should('have.css','font-weight','700')
            });
});
  

            context("Linha -Air India-", () => {
            
             beforeEach(() => {
                cy.get('.col-7').eq(6).as('air_india').log('Alias (@air_india) para armazenar a coluna referente a Air India, a fim de reaproveitá-la nessa seção de testes (Contexto: Linha -Air India-)')
            });

            it("Validar se a linha -Air India- está na tabela de Top Flights", () => {
                cy.get('.col-7')
                .find('h6')
                .should("contain.text", "Air India");
            
            });

            it('"Validar informações de origem/destino da linha -Air India- em Top Flight"', () => {

                cy.get('@air_india')
                .xpath(elHome.mubai_to_dubai_flight)
                .should('contain.text','Mumbai')
                .and('contain.text','Dubai')

            });

            it('Validar preço inicial do voo -Mumbai & Dubai- em Top Flight', () => {
                cy.log('Checar preço seguindo a ordem: From USD 450')
                cy.get(elHome.top_fligh_from_and_prices).eq(6).invoke('text').then((air_india_price) =>{

                    expect(air_india_price).to.include('From').include('USD 450')

                })
                
            });

            it('Validar redirecionamento ao clicar no voo Mumbai → Dubai', () => {
                cy.get('h6').eq(6)
                .click({force:true},{timeout:10000})
                cy.url()
                .should('include','/bom/dxb/')
                .then((href) =>{
                    cy.writeFile('cypress/validation/results/home/saved_flight_url.txt', href)
                    cy.readFile('cypress/validation/results/home/saved_flight_url.txt').should('exist')
                })
                cy.get(elFlight.destination_titulo).first()
                .should('contain.text','BOM')
                .and('contain.text','DXB')
            });

        });

    });
    

    /*
it("sds", () => {
    cy.get('a[title="flights"]').click({ force: true });
    cy.get('[type="radio"]')
        .check("return", { force: true })
        .should("be.checked")
        .get('label[for="round-trip"]')
        .should("have.text", " Round Trip");
});*/
});
