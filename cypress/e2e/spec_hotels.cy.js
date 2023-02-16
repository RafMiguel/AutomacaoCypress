///<reference types="cypress"/>

import rgbHex from "rgb-hex";
import { elHome, elHotel } from "../support/elementos";
import txt_estatico from "../fixtures/estaticos.json"
import date from "../support/date"

describe("Book a Hotel - PHPTravels", () => {

    context("Hotel page", () => {
        it("Go to hotel menu", () => {
            cy.rota(".net/");
            cy.get(elHome.home_top_menu)
                .contains("Hotels")
                .should("have.attr", "title", "hotels")
                .and("have.text", "Hotels")
                .click({ force: true });
            cy.url()
            .should("eq", "https://phptravels.net/hotels");
            cy.get(elHotel.search_hotel_title)
            .should("have.text", txt_estatico.search_best_hotels);
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
            cy.shot('Hotels - Search Box')
  
        });

        it("Pick a unavailable hotel", () => {
            cy.search_hotel_by_city('Egypt','Nile Egypt,Egypt')
     
            cy.get(".col-md-6").find("span")
            .contains("Checkout");
            cy.get(elHotel.calendar_checkout)
            .invoke("attr","value","10-02-2009")
            .log('**_Picked a older date to force a unavailable result_**');

            cy.get(elHotel.search_btn)
            .click({force:true})
            cy.get(elHotel.no_results)
            .should('be.visible')
            .and('have.attr', 'alt', 'no results')
            cy.shot('Hotels - No Results')
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
            cy.get(elHotel.search_btn)
            .should('be.visible')
            
            .click({force:true})

            cy.log('**_Validate parameters sended at previous page_**')
            cy.get(elHotel.results_at_menu_bar).as('results')
            .find('h2[class="sec__title_list"]')
            .should('have.text',txt_estatico.singapore_hotels_search)
            cy.get('@results').find('strong')
            .contains('9 Nights').as('days_qtd')
            .invoke('css','font-weight')
            .then((font_weight) =>{

                cy.log('font-weight igual a '+font_weight)
                expect(font_weight).to.eq('700')
            })

            cy.get('@days_qtd')
            .get('p').first()
            .invoke('text')
            .then((days) =>{

                expect(days).to.contains('9 Nights').to.contains(date.today()).to.contains(date.nine_days_before_today())
                
            })
            cy.shot('Hotels - Search Results')

            })
            
    });

    context('Exploring the results of the search above', () => {
        beforeEach(() => {
            cy.custom_url()
        });
        
        it('sadsd', () => {
            cy.log('sds')
        });
    });
})

