///<reference types="cypress"/>

import rgbHex from "rgb-hex";
import { elHome, elHotel } from "../support/elementos";

describe("Book a Hotel - PHPTravels", () => {


    context("Hotel page", () => {
        it("Go to hotel menu", () => {
            cy.rota(".net/");
            cy.get(".main-menu-content.w-100")
                .contains("Hotels")
                .should("have.attr", "title", "hotels")
                .and("have.text", "Hotels")
                .click({ force: true });
            cy.url().should("eq", "https://phptravels.net/hotels");
            cy.get(elHotel.search_hotel_title).should("have.text", "SEARCH FOR BEST HOTELS");
        });
    })

        context('Searching hotels', () => {
            
        beforeEach(() => {
            cy.rota(".net/hotels");
            cy.get('.main_search.contact-form-action').get('.row.g-1').first().as('search_field')
            cy.clearCookies()
        });

        it.only("Pick a unavailable hotel", () => {
            cy.search_hotel_by_city('Egypt','Nile Egypt,Egypt')
     
            cy.get(".col-md-6").find("span").contains("Checkout");
            cy.get(elHotel.calendar_checkout)
            .invoke("attr","value","10-02-2009").log('**_Picked a older date to force a unavailable result_**');
            cy.get('#submit').click({force:true})
            cy.get(elHotel.no_results).should('be.visible').and('have.attr', 'alt', 'no results')
        });

        it.only('Search a available hotel using search parameters', () => {

            cy.log('**_Validating title "City Name"_**')
            cy.get('@search_field')
            .find('span[class="label-text"]')
            .first()
            .should('have.text','City Name').as('city_name')
            cy.log('**_Clicking on "Search by City" search field_**')
            cy.search_hotel_by_city('Singapore','Singapore,Singapore')

            
            
        });
    });
});
