///<reference types="cypress"/>

import rgbHex from "rgb-hex";
import { elHotel } from "../support/elementos";
import date from "../support/date"

describe("Book a Hotel - PHPTravels", () => {

    context("Hotel page", () => {
        it("Go to hotel menu", () => {
            cy.rota(".net/");
            cy.get(".main-menu-content.w-100")
                .contains("Hotels")
                .should("have.attr", "title", "hotels")
                .and("have.text", "Hotels")
                .click({ force: true });
            cy.url()
            .should("eq", "https://phptravels.net/hotels");
            cy.get(elHotel.search_hotel_title)
            .should("have.text", "SEARCH FOR BEST HOTELS");
        });
    })

        context('Searching hotels', () => {
            
        beforeEach(() => {
            cy.rota(".net/hotels");
            cy.get(elHotel.search_container)
            .get('.row.g-1').first().as('search_field')
            cy.clearCookies()
        });

        it('Validate labels at search box', () => {
            cy.get('@search_field')
            .find(elHotel.search_labels).as('labels').first()
            .should('have.text','City Name')
            cy.get('@labels').eq(1)
            .should('have.text','Checkin')
            cy.get('@labels').eq(2)
            .should('have.text','Checkout')
            cy.xpath(elHotel.travellers_label)
            .should('have.text','Travellers')
  
        });

        it("Pick a unavailable hotel", () => {
            cy.search_hotel_by_city('Egypt','Nile Egypt,Egypt')
     
            cy.get(".col-md-6").find("span")
            .contains("Checkout");
            cy.get(elHotel.calendar_checkout)
            .invoke("attr","value","10-02-2009")
            .log('**_Picked a older date to force a unavailable result_**');

            cy.get('#submit')
            .click({force:true})
            cy.get(elHotel.no_results)
            .should('be.visible')
            .and('have.attr', 'alt', 'no results')
        });

        it('Search a available hotel using search parameters', () => {

            cy.log('**_Clicking on "Search by City" search field_**')
            cy.search_hotel_by_city('Singapore','Singapore,Singapore')
            cy.get(elHotel.calendar_checkin)
            .invoke('attr','value',date.nine_days_before_today())
            .log('**_Will pick the current date minus 9 days from today_**')

            cy.get(elHotel.calendar_checkout)
            .invoke('attr','value',date.today())
            .log('**_Will pick the current date_**')
            
            cy.get(elHotel.travellers_menu_drop)
            .invoke('attr','style','display: grid;')
            .should('be.visible').as('travelling_display')
            cy.get('@travelling_display')
            .find('.dropdown-item').eq(1)
            .should('contain.text','Adults')
            .find(elHotel.adults_qtd)
            .invoke('attr','value','3')
            .should('have.value','3')
            cy.get('#submit')
            .should('be.visible')
            .and('contain.text','Search')
            .click({force:true})

            cy.log('**_Validate parameters sended at previous page_**')
            cy.get(elHotel.results_at_menu_bar)
            .find('h2[class="sec__title_list"]')
            .should('have.text','Search Hotels in singapore')
            cy.get(elHotel.results_at_menu_bar)
            .find('p').first()
            .find('strong')
            

            })
            
    });
});