/// <reference types="cypress"/>

import rgbHex from "rgb-hex";
import txt_estatico from "../fixtures/estaticos.json";
import { elHome } from "../support/elementos";

describe("Home PHPTravels", () => {

    before(() => {
        cy.rota(".net/").log("Acessou site PHPTravels.net");
        
    });

    context("Estáticos da home", () => {
        it("Título - Lets book your next trip", () => {
            cy.log("Capturar elemento que contém o título -Let’s book your next trip!- e validar título");
            
            cy.get("h2")
                .first()
                .find("strong")
                .should("have.css", "font-weight", "700")
                .and("have.text", " Let’s book your next trip!");
        });

        it("Sub título - Choose best deals over 1.5 million travel services", () => {
            cy.get("p")
                .first()
                .should("have.text", "Choose best deals over 1.5 million travel services");
        });

        it("Coluna - You never roam alone", () => {
            cy.get(elHome.info_titulo)
                .first()
                .should("have.text", txt_estatico.never_roam_alone)
                .get(elHome.info_descricao)
                .first()
                .should("contain.text", txt_estatico.find_best_travel);
        });

        it("Coluna - Travel to anytime, anywhere", () => {
            cy.get(elHome.info_titulo)
                .eq(1)
                .should("have.text", txt_estatico.travel_anytime)
                .get(elHome.info_descricao)
                .eq(1)
                .should("contain.text", txt_estatico.no_limits);
        });

        it("Coluna - Ease of mind, search filter and book", () => {
            cy.get(elHome.info_titulo)
                .eq(2)
                .should("have.text", txt_estatico.ease_of_mind);

            cy.get(elHome.info_descricao)
                .eq(2)
                .should("contain.text", txt_estatico.lets_help);
        });

        it('Validar informação sobre taxas e tarifas abaixo da tabela Top Flights', () => {
            cy.get(elHome.taxes_fees_description).should('be.visible').and('have.text',txt_estatico.taxes_fees_description)
        });
    });

    context("Top flights destination", () => {
        it('Validar título -Top Flight Destinations- e sua cor', () => {
            cy.get("h2")
            .eq(1)
            .should("be.visible")
            .and("have.text", txt_estatico.top_flight)
            .and("have.css", "font-weight", "700")
            .as("top_flight_title");

            cy.get("@top_flight_title")
            .invoke("css", "color")
            .then((font_color) => {
                expect(rgbHex(font_color)).to.eq("0d233e");
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
                .get('h3')
                .eq(6)
                .should('contain.text','Mumbai')
                .and('contain.text','Dubai')

            });

            it('Validar preço inicial do voo -Mumbai & Dubai- em Top Flight', () => {
                cy.log('Checar preço seguindo a ordem: From USD 450')
                cy.get(elHome.top_fligh_prices)
                .eq(6)
                .should('be.visible')
                .find('span').as('air_india_price')
                .first()
                .should('have.text','From')
                cy.get('@air_india_price')
                .eq(1)
                .should('have.text','USD 450')
                
            });

            it.skip('Validar redirecionamento ao clicar no voo Mumbai → Dubai', () => {
                cy.get('h6').eq(6).click({force:true},{timeout:10000})
                cy.url()
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
