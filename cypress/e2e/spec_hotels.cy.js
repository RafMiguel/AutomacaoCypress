///<reference types="cypress"/>

import rgbHex from "rgb-hex";
import { elHome, elHotel } from "../support/elementos";
import txt from "../fixtures/estaticos.json"
import date from "../support/date"



describe("Book a Hotel - PHPTravels", () => {

    const txt_rendez = 'cypress/validation/results/hotel/rendezvous/about_rendezvous.txt'

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
            .should("have.text", txt.search_best_hotels);
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
            cy.url().then((url_param) =>{

                cy.writeFile('cypress/validation/results/hotel/saved_hotel_url.txt',url_param)
            })
            cy.get(elHotel.results_at_menu_bar).as('results')
            .find('h2[class="sec__title_list"]')
            .should('have.text',txt.singapore_hotels_search)
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
            cy.readFile('cypress/validation/results/hotel/saved_hotel_url.txt').should('exist').then((current_url) =>{
                cy.visit(current_url)
            })
            
        });
        
        it('Validate lenght of results by title', () => {
            cy.get(elHotel.results.main_container)
            .find('ul').children()
            .find(elHotel.results.per_hotel).as('lenght_results')
            .should('have.length.above',0)
            cy.get('@lenght_results')
            .find(elHotel.results.per_hotel_name)
            .invoke('text')
            .then(text => text.split('\n'))
            .then(text => text.map(text =>text.trim()))
            .then(text => text.filter(text => text))
            .then(results =>{

                cy.writeFile('cypress/validation/results/hotel/hotel_results.txt',results)
                cy.writeFile('cypress/validation/results/hotel/hotel_results.json',results)
                cy.readFile('cypress/validation/results/hotel/hotel_results.txt')
                .should('deep.include','Rendezvous Hotels')
                .and('deep.include','Swissotel Le Plaza Basel')
                
            cy.log('Cypress will storage the name of hotels returned from the search in a txt and a json file')

//invoke('text').then(text => text.split('\n')) = Add break between lines
//invoke('text').then(text => text.map(text =>text.trim())) = Remove blank whitespaces from the text obtained
//invoke('text').then(text => text.filter(text => text)) = Remove empty (like quotes, for example) that doesn't make part of the text

            })
        })

        it('Validate if the hotels returned are from Singapore', () => {
            cy.get(elHotel.results.hotel_location)
            .should('contain.text','singapore')
        });

        context('Rendezvous container details', () => {
            it('Rendezvous - Hotel description', () => {
                cy.get(elHotel.results.hotel_description)
                .contains('Rendezvous')
                .should('have.text','Rendezvous Hotel Singapore by Far East Hospitality ').as('rendezvous')
                cy.get('@rendezvous')
                .should('have.css','font-size','12px')
                })

                it('Rendezvous - Prices column', () => {
                    cy.singapore_prices_column('0','12px','700','18px','841.50')
                    cy.get(elHotel.results.hotel_card_price)
                    .find(elHotel.results.hotel_period).first()
                    .should('have.text','9 Nights')
                });

                it('Rendezvous - Ratings', () => {
                    cy.get(elHotel.results.main_container)
                    .find('ul')
                    .find('li[id="rendezvous hotels"]')
                    .should('have.attr','id','rendezvous hotels').as('rendezvous')
                    cy.get('@rendezvous')
                    .find('.review__text')
                    .find(elHotel.results.hotel_star_rating)
                    .should('have.length',2)
                    cy.get('@rendezvous')
                    .find('.rating__text')
                    .should('have.text','2 Ratings')
                    
                });

                it('Rendezvous - Details button', () => {
                    cy.get('.card-price')
                    .find('a[href]').first()
                    .invoke('attr','href')
                    .then((href) =>{
                        expect(href).to.deep.include('rendezvous-hotel')
                    })
                    
                    })
                });

                context('Swissotel container details', () => {
                    it('Swissotel - Hotel description', () => {
                        cy.get(elHotel.results.hotel_description)
                        .contains('Swiss')
                        .should('have.text','Swissôtel Le Plaza Basel, Messeplatz, Basle, Swis ').as('swissotel')
                        cy.get('@swissotel')
                        .should('have.css','font-size','12px')
                    });
            
                    it('Swissotel - Prices column', () => {
                        cy.singapore_prices_column('1','12px','700','18px','792.00')
                        cy.get(elHotel.results.hotel_card_price)
                        .find(elHotel.results.hotel_period).first()
                        .should('have.text','9 Nights')
                    });
            
                    it('Swissotel - Ratings', () => {
                        cy.get(elHotel.results.main_container)
                        .find('ul')
                        .find('li[id="swissotel le plaza basel"]')
                        .should('have.attr','id','swissotel le plaza basel').as('swissotel')
                        cy.get('@swissotel')
                        .find('.review__text')
                        .find(elHotel.results.hotel_star_rating)
                        .should('have.length',4)
                        cy.get('@swissotel')
                        .find('.rating__text')
                        .should('have.text','4 Ratings')
                    });
            
                    it('Swissotel - Approval badge', () =>{
                        
                        cy.readFile('cypress/fixtures/approval_badge.txt')
                        .then((approval_badge) =>{
                            cy.get(elHotel.results.hotel_card_price)
                            .find('img[style]')
                            .should('be.visible')
                            .and('have.attr','src',approval_badge)
                        })
                    })
            
                    it('Swissotel - Details button', () => {
                        cy.get('.card-price')
                        .find('a[href]').eq(1)
                        .invoke('attr','href')
                        .then((href) =>{
                            expect(href).to.deep.include('swissotel-le-plaza-basel')
                        })
            
                        })
                        
                        })

                        context('Menu bar - Filter Search', () => {
                            it('Validate tha we are in Filter Search section', () => {
                                cy.get('.sticky-top')
                                .find('.card-header').as('filter_search')
                                .should('contain.text','Filter Search')
                                cy.get('@filter_search')
                                .find('strong')
                                .should('have.css', 'font-weight', '700')
                                cy.get('@filter_search')
                                .find('strong')
                                .should('have.css', 'color', 'rgb(16, 98, 254)') //>>>> validate direcly by rgb-color
                               cy.get('@filter_search')
                               .find('strong')
                               .invoke('css', 'color')
                               .then((color) =>{
                                expect(rgbHex(color)).to.eq('1062fe')
                               })
                            });

                            it('Filter hotel by name (Rendezvous)', () => {

                                cy.get('.sticky-top')
                                .find('h3[class="title stroke-shape"]').first()
                                .should('contain.text', 'Search by Name')
                                cy.get('.sidebar-widget')
                                .find('input[type="text"]').first()
                                .should('have.attr', 'placeholder', 'Hotel name.')
                                .type('Rendezvous', {force:true})

                                cy.get(elHotel.results.main_container)
                                .find('ul').children()
                                .find(elHotel.results.per_hotel)
                                .contains('Swissotel')
                                .should('not.be.visible')
                                .get(elHotel.results.per_hotel).first()
                                .should('be.visible')
                                .and('contain.text', 'Rendezvous')

                            });

                            it('Filter hotel by name (Swissotel)', () => {
                                
                                cy.get('.sticky-top')
                                .find('h3[class="title stroke-shape"]').first()
                                .should('contain.text', 'Search by Name')
                                cy.get('.sidebar-widget')
                                .find('input[type="text"]').first()
                                .should('have.attr', 'placeholder', 'Hotel name.')
                                .type('Swissotel', {force:true})

                                cy.get(elHotel.results.main_container)
                                .find('ul').children()
                                .find(elHotel.results.per_hotel)
                                .contains('Rendezvous')
                                .should('not.be.visible')
                                .get(elHotel.results.per_hotel).eq(1)
                                .should('be.visible')
                                .and('contain.text', 'Swissotel')

                            });
                            

                            it('Filter hotel by star rating (Rendezvous)', () => {
                                cy.get('.sticky-top')
                                .find('h3[class="title stroke-shape"]').eq(1)
                                .should('have.text', 'Star Grade')
                                cy.get(elHotel.results.main_container)
                                .find('ul').find('li[id="rendezvous hotels"]')
                                .should('have.attr','id','rendezvous hotels').as('rendezvous')
                                cy.get('@rendezvous')
                                .find('span[style]')
                                .invoke('text')
                                .then((rating) =>{
                                    cy.log('**'+rating+'**')

                                    if (rating.includes('1')) {
                                        cy.get('ul.list.remove_duplication').find('input[type="checkbox"]').check('.stars_1',{force:true}).should('be.checked').and('include.value', '1')
                                    } else if(rating.includes('2')){
                                        cy.get('ul.list.remove_duplication').find('input[type="checkbox"]').check('.stars_2',{force:true}).should('be.checked').and('include.value', '2')
                                    }else if (rating.includes('3')) {
                                        cy.get('ul.list.remove_duplication').find('input[type="checkbox"]').check('.stars_3',{force:true}).should('be.checked').and('include.value', '3')
                                    } else if(rating.includes('4')){
                                        cy.get('ul.list.remove_duplication').find('input[type="checkbox"]').check('.stars_4',{force:true}).should('be.checked').and('include.value', '4')
                                    } else if(rating.includes('5')){
                                        cy.get('ul.list.remove_duplication').find('input[type="checkbox"]').check('.stars_5',{force:true}).should('be.checked').and('include.value', '5')
                                    }
                                })
                            
                        });

                        it('Filter hotel by star rating (Swissotel)', () => {
                            cy.get('.sticky-top')
                            .find('h3[class="title stroke-shape"]').eq(1)
                            .should('have.text', 'Star Grade')
                            cy.get(elHotel.results.main_container)
                            .find('ul').find('li[id="swissotel le plaza basel"]')
                            .should('have.attr','id','swissotel le plaza basel').as('swissotel')
                            cy.get('@swissotel')
                            .find('span[style]')
                            .invoke('text')
                            .then((rating) =>{
                                cy.log('**'+rating+'**')

                                if (rating.includes('1')) {
                                    cy.get('ul.list.remove_duplication').find('input[type="checkbox"]').check('.stars_1',{force:true}).should('be.checked').and('include.value', '1')
                                } else if(rating.includes('2')){
                                    cy.get('ul.list.remove_duplication').find('input[type="checkbox"]').check('.stars_2',{force:true}).should('be.checked').and('include.value', '2')
                                }else if (rating.includes('3')) {
                                    cy.get('ul.list.remove_duplication').find('input[type="checkbox"]').check('.stars_3',{force:true}).should('be.checked').and('include.value', '3')
                                } else if(rating.includes('4')){
                                    cy.get('ul.list.remove_duplication').find('input[type="checkbox"]').check('.stars_4',{force:true}).should('be.checked').and('include.value', '4')
                                } else if(rating.includes('5')){
                                    cy.get('ul.list.remove_duplication').find('input[type="checkbox"]').check('.stars_5',{force:true}).should('be.checked').and('include.value', '5')
                                }
                            })
                        
                    });

                    it('Filter hotel by Price range (Rendezvous)', () => {
                        cy.get('.sidebar-widget').find('.title.stroke-shape').contains('Price').should('have.text', 'Price Range')
                    });
        });

    });

    context('Details page', () => {
before(() => {
    cy.readFile('cypress/validation/results/hotel/saved_hotel_url.txt').should('exist').then((current_url) =>{
        cy.visit(current_url)
    })
})
    context('Details page - Rendezvous', () => {
            it('Enter Rendezvous details page', () => {
                cy.get('.card-price')
                .find('a[href]').first()
                .click({force:true})
                cy.get('.col-md-7').find('h3')
                .should('contain.text', 'Rendezvous Hotels')
                cy.get('.col-md-7').find('.mr-2')
                .should('have.text', 'Singapore, Rendezvous Hotels')
            });

            it('Validate title and text in "About Rendezvous Hotels"', () => {
                cy.get('#description')
                .find('h3')
                .should('be.visible').and('have.text', 'About Rendezvous Hotels')
                cy.get('#description')
                .find('p[class="py-3"]').as('about_rendezvous')
                .should('be.visible')
                .invoke('text')
                .then((desc) =>{
                    cy.writeFile(txt_rendez, desc)
                    cy.readFile(txt_rendez).then((about_rendezvous) =>{
                        cy.get('@about_rendezvous').should('have.text', about_rendezvous)
                    })
                })
               
            });
    });
 

    });

})
