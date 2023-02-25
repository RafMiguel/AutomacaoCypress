///<reference types="cypress"/>

import rgbHex from "rgb-hex";
import { elHome, elHotel } from "../support/elementos";
import txt from "../fixtures/estaticos.json"
import client from "../fixtures/dados_cliente.json"
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
            cy.search_hotel_by_city('Istanbul','Istanbul,Turkey')
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
            .should('have.text',txt.instanbul_hotels_search)
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
        before(() => {
            cy.readFile('cypress/validation/results/hotel/saved_hotel_url.txt').should('exist').then((current_url) =>{
                cy.visit(current_url)
            })
            
        });
        
        it('Validate lenght of results by title', () => {
            cy.get(elHotel.results.main_container)
            .find('ul').children()
            .find(elHotel.results.per_hotel).as('lenght_results')
            .should('have.length.at.least',1)
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
                .should('deep.include','Tria Hotel Istanbul Special')
                .and('deep.include','Grand Plaza Apartments')
                .and('deep.include','Alzer Hotel Istanbul')
                
            cy.log('Cypress will storage the name of hotels returned from the search in a txt and a json file')

//invoke('text').then(text => text.split('\n')) = Add break between lines
//invoke('text').then(text => text.map(text =>text.trim())) = Remove blank whitespaces from the text obtained
//invoke('text').then(text => text.filter(text => text)) = Remove empty (like quotes, for example) that doesn't make part of the text

            })
        })

        it('Validate if the hotels returned are from Istanbul', () => {
            cy.get(elHotel.results.hotel_location)
            .should('contain.text','istanbul')
        });

        context('Tria Hotel container details', () => {
            it('Tria - Hotel description', () => {
                cy.get(elHotel.results.hotel_description)
                .contains('Tria Hotel')
                .should('have.text','Tria Hotel, Istanbul, Turkey ').as('tria')
                cy.get('@tria')
                .should('have.css','font-size','12px')
                })

                it('Tria - Prices column', () => {
                    cy.istanbul_prices_column('0','12px','700','18px','346.50')
                    cy.get(elHotel.results.hotel_card_price)
                    .find(elHotel.results.hotel_period).first()
                    .should('have.text','9 Nights')
                });

                it('Tria - Ratings', () => {
                    cy.get(elHotel.results.main_container)
                    .find('ul')
                    .find('li[id="tria hotel istanbul special"]')
                    .should('have.attr','id','tria hotel istanbul special').as('tria')
                    cy.get('@tria')
                    .find('.review__text')
                    .find(elHotel.results.hotel_star_rating)
                    .should('have.length',5)
                    cy.get('@tria')
                    .find('.rating__text')
                    .should('have.text','5 Ratings')
                    
                });

                it('Tria - Approval badge', () =>{
                                
                    cy.readFile('cypress/fixtures/approval_badge.txt')
                    .then((approval_badge) =>{
                        cy.get(elHotel.results.hotel_card_price)
                        .find('img[style]').eq(0)
                        .should('be.visible')
                        .and('have.attr','src',approval_badge)
                    })
                })

                it('Tria - Details button', () => {
                    cy.get('.card-price')
                    .find('a[href]').first()
                    .invoke('attr','href')
                    .then((href) =>{
                        expect(href).to.deep.include('tria-hotel')
                    })
                    
                    })
                });

                context('Grand Plaza container details', () => {
                    it('Grand Plaza - Hotel description', () => {
                        cy.get(elHotel.results.hotel_description)
                        .contains('Grand')
                        .should('have.text','Grand Plaza Apartments, South Highlander Way, Howe ').as('grand_plaza')
                        cy.get('@grand_plaza')
                        .should('have.css','font-size','12px')
                    });
            
                    it('Grand Plaza - Prices column', () => {
                        cy.istanbul_prices_column('1','12px','700','18px','346.50')
                        cy.get(elHotel.results.hotel_card_price)
                        .find(elHotel.results.hotel_period).eq(1)
                        .should('have.text','9 Nights')
                    });
            
                    it('Grand Plaza - Ratings', () => {
                        cy.get(elHotel.results.main_container)
                        .find('ul')
                        .find('li[id="grand plaza apartments"]')
                        .should('have.attr','id','grand plaza apartments').as('grand_plaza')
                        cy.get('@grand_plaza')
                        .find('.review__text')
                        .find(elHotel.results.hotel_star_rating)
                        .should('have.length',4)
                        cy.get('@grand_plaza')
                        .find('.rating__text')
                        .should('have.text','4 Ratings')
                    });
            
                    it('Grand Plaza - Approval badge', () =>{
                        
                        cy.readFile('cypress/fixtures/approval_badge.txt')
                        .then((approval_badge) =>{
                            cy.get(elHotel.results.hotel_card_price)
                            .find('img[style]').eq(1)
                            .should('be.visible')
                            .and('have.attr','src',approval_badge)
                        })
                    })
            
                    it('Grand Plaza - Details button', () => {
                        cy.get('.card-price')
                        .find('a[href]').eq(1)
                        .invoke('attr','href')
                        .then((href) =>{
                            expect(href).to.deep.include('grand-plaza')
                        })
            
                        })
                        
                        })

                        context('Alzer Hotel container details', () => {
                            it('Alzer - Hotel description', () => {
                                cy.get(elHotel.results.hotel_description)
                                .contains('Alzer')
                                .should('have.text','Alzer Hotel, Fatih, Istanbul, Turkey ').as('alzer')
                                cy.get('@alzer')
                                .should('have.css','font-size','12px')
                            });
                    
                            it('Alzer - Prices column', () => {
                                cy.istanbul_prices_column('2','12px','700','18px','693.00')
                                cy.get(elHotel.results.hotel_card_price)
                                .find(elHotel.results.hotel_period).eq(2)
                                .should('have.text','9 Nights')
                            });
                    
                            it('Alzer - Ratings', () => {
                                cy.get(elHotel.results.main_container)
                                .find('ul')
                                .find('li[id="alzer hotel istanbul"]')
                                .should('have.attr','id','alzer hotel istanbul').as('alzer')
                                cy.get('@alzer')
                                .find('.review__text')
                                .find(elHotel.results.hotel_star_rating)
                                .should('have.length',4)
                                cy.get('@alzer')
                                .find('.rating__text')
                                .should('have.text','4 Ratings')
                            });
                    
                            it('Alzer - Approval badge', () =>{
                                
                                cy.readFile('cypress/fixtures/approval_badge.txt')
                                .then((approval_badge) =>{
                                    cy.get(elHotel.results.hotel_card_price)
                                    .find('img[style]').eq(2)
                                    .should('be.visible')
                                    .and('have.attr','src',approval_badge)
                                })
                            })
                    
                            it('Alzer - Details button', () => {
                                cy.get('.card-price')
                                .find('a[href]').eq(2)
                                .invoke('attr','href')
                                .then((href) =>{
                                    expect(href).to.deep.include('alzer-hotel')
                                })
                    
                                })
                                
                                })

                        context('Menu bar - Filter Search', () => {
                            beforeEach(() => {
                                cy.readFile('cypress/validation/results/hotel/saved_hotel_url.txt').should('exist').then((current_url) =>{
                                    cy.visit(current_url)
                                })
                            });
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

                            it('Filter hotel by name (Tria Hotel)', () => {

                                cy.get('.sticky-top')
                                .find('h3[class="title stroke-shape"]').first()
                                .should('contain.text', 'Search by Name')
                                cy.get('.sidebar-widget')
                                .find('input[type="text"]').first()
                                .should('have.attr', 'placeholder', 'Hotel name.')
                                .type('Tria Hotel', {force:true})

                                cy.get(elHotel.results.main_container)
                                .find('ul').children()
                                .find(elHotel.results.per_hotel)
                                .contains('Grand Plaza')
                                .should('not.be.visible')

                                cy.get(elHotel.results.main_container)
                                .find('ul').children()
                                .find(elHotel.results.per_hotel)
                                .contains('Alzer Hotel')
                                .should('not.be.visible')

                                .get(elHotel.results.per_hotel).first()
                                .should('be.visible')
                                .and('contain.text', 'Tria Hotel Istanbul Special')

                            });

                            it('Filter hotel by name (Grand Plaza)', () => {
                                
                                cy.get('.sticky-top')
                                .find('h3[class="title stroke-shape"]').first()
                                .should('contain.text', 'Search by Name')
                                cy.get('.sidebar-widget')
                                .find('input[type="text"]').first()
                                .should('have.attr', 'placeholder', 'Hotel name.')
                                .type('Grand Plaza', {force:true})

                                cy.get(elHotel.results.main_container)
                                .find('ul').children()
                                .find(elHotel.results.per_hotel)
                                .contains('Tria Hotel')
                                .should('not.be.visible')

                                cy.get(elHotel.results.main_container)
                                .find('ul').children()
                                .find(elHotel.results.per_hotel)
                                .contains('Alzer Hotel')
                                .should('not.be.visible')

                                .get(elHotel.results.per_hotel).eq(1)
                                .should('be.visible')
                                .and('contain.text', 'Grand Plaza Apartments')

                            });

                            it('Filter hotel by name (Alzer Hotel)', () => {
                                
                                cy.get('.sticky-top')
                                .find('h3[class="title stroke-shape"]').first()
                                .should('contain.text', 'Search by Name')
                                cy.get('.sidebar-widget')
                                .find('input[type="text"]').first()
                                .should('have.attr', 'placeholder', 'Hotel name.')
                                .type('Alzer Hotel', {force:true})

                                cy.get(elHotel.results.main_container)
                                .find('ul').children()
                                .find(elHotel.results.per_hotel)
                                .contains('Tria Hotel')
                                .should('not.be.visible')

                                cy.get(elHotel.results.main_container)
                                .find('ul').children()
                                .find(elHotel.results.per_hotel)
                                .contains('Grand Plaza')
                                .should('not.be.visible')

                                .get(elHotel.results.per_hotel).eq(2)
                                .should('be.visible')
                                .and('contain.text', 'Alzer Hotel Istanbul')

                            });
                            

                            it('Filter hotel by star rating (Tria Hotel)', () => {
                                cy.get('.sticky-top')
                                .find('h3[class="title stroke-shape"]').eq(1)
                                .should('have.text', 'Star Grade')
                                cy.get(elHotel.results.main_container)
                                .find('ul').find('li[id="tria hotel istanbul special"]')
                                .should('have.attr','id','tria hotel istanbul special').as('tria')
                                cy.get('@tria')
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

                        it('Filter hotel by star rating (Grand Plaza)', () => {
                            cy.get('.sticky-top')
                            .find('h3[class="title stroke-shape"]').eq(1)
                            .should('have.text', 'Star Grade')
                            cy.get(elHotel.results.main_container)
                            .find('ul').find('li[id="grand plaza apartments"]')
                            .should('have.attr','id','grand plaza apartments').as('grand_plaza')
                            cy.get('@grand_plaza')
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

                    it('Filter hotel by star rating (Alzer Hotel)', () => {
                        cy.get('.sticky-top')
                        .find('h3[class="title stroke-shape"]').eq(1)
                        .should('have.text', 'Star Grade')
                        cy.get(elHotel.results.main_container)
                        .find('ul').find('li[id="alzer hotel istanbul"]')
                        .should('have.attr','id','alzer hotel istanbul').as('alzer')
                        cy.get('@alzer')
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
                        cy.get('.sidebar-widget')
                        .find('.title.stroke-shape')
                        .contains('Price')
                        .should('have.text', 'Price Range')
                    });
        });

    });

    context('Details page', () => {
before(() => {
    cy.readFile('cypress/validation/results/hotel/saved_hotel_url.txt').should('exist').then((current_url) =>{
        cy.visit(current_url)
    })
    
})
    context('Details page - Tria Hotel', () => {
        
            it('Enter Tria Hotel details page', () => {
                
                cy.get('.card-price')
                .find('a[href]').first()
                .click({force:true})
                cy.get('.col-md-7')
                .find('h3')
                .should('contain.text', 'Tria Hotel Istanbul Special')
                cy.get('.col-md-7')
                .find('.mr-2')
                .should('have.text', 'Istanbul, Tria Hotel Istanbul Special')

            });

            it('Validate title and text in "About Tria Hotel"', () => {

                const tria_desc = 'The Hotel Tria Istanbul is an intimate, style hotel, elegantly decorated and recently opened in Sultanahmet, boasting views of the Marmara Sea and the Asian Side. Crafted from a traditional Ottoman edifice, its wooden facade reflects the nobility and charm of historical Istanbul, whilst its deluxe and standard rooms are comfortably furnished with modern amenities. This special class hotel is a short walk from the most significant monuments of ancient imperial Byzantium, such as the splendid Hagia Sophia, Hippodrome and Basilica Cistern, as well as Ottoman masterpieces like Topkapi Palace and the Blue Mosque.'

                cy.get('#description')
                .find('h3')
                .should('be.visible')
                .and('have.text', 'About Tria Hotel Istanbul Special')
                cy.get('#description')
                .find('p[class="py-3"]')
                .should('have.text', tria_desc)
               
            });

                context('Getting a Standard Room', () => {
                    it('Validate "Standard Room" at "Available Rooms" section', () => {
                        cy.get('.sec__title_left')
                        .should('have.text', 'Available Rooms')
                        cy.get('.card.mb-4')
                        .contains('Standard Room')
                        .should('be.visible')
                        .and('have.text', 'Standard Room')
                    });

                    it('Validate Standard Room Amenities at "Available Rooms" section', () => {
                        cy.get('.card.mb-4')
                        .find('.col-md-3').as('amenities')
                        .find('strong')
                        .eq(4)
                       .should('have.text', 'Amenities')

                       cy.get('@amenities')
                       .find('.d-grid').eq(2).as('stand_amenities')
                       cy.get('@stand_amenities')
                       .find('.hotels_amenities')
                       .should('have.length', 3)

                       cy.color_check('.hotels_amenities', 'color', '00a624').log('**00a624 = Green**')

                    });

                    it('Pick two Standard Rooms and validate price', () => {
                        cy.get('select[name="room_quantity"]').eq(2)
                        .select('2', {force:true})

                        cy.get('.card.mb-4').eq(2)
                        .find('.col-md-2').eq(1)
                        .should('contain.text', 'Price')
                        .should('eq', 'USD 990.00')
                        cy.log('**Only the first price option works. If changed to second value option, nothing happens**')    
                        
                    });

                    it('Click on "Book Now" to book a standar room', () => {
                        cy.get('.col')
                        .find('button[type="submit"]').eq(2)
                        .should('contain.text', 'Book Now')
                        .click({force:true})
                        cy.get('.section-heading')
                        .find('h2').first()
                        .should('have.text', 'Hotel Booking')
                        cy.url()
                        .should('eq', 'https://phptravels.net/hotels/booking')
        
                    });

                    context('Filling Form', () => {
                        it('Checking that the Hotel name and Room type is the same that we choose', () => {
                            cy.get('.d-flex > div > .card-title').should('have.text', 'Tria Hotel Istanbul Special').and('have.css', 'color', 'rgb(255, 255, 255)')
                            cy.get('.mt-2').should('have.text', 'Standard Room')
                        });
                        it('Filling in - Your Personal Information', () => {

                            cy.get('.title').first().should('have.text', 'Your Personal Information').and('have.css', 'font-size', '18px')
                            cy.get('.contact-form-action').find('input[name="firstname"]').should('have.attr', 'type', 'text').and('have.attr', 'placeholder', 'First Name').type(client.main.first_name, {force:true})
                            cy.get('.contact-form-action').find('input[name="lastname"]').should('have.attr', 'type', 'text').and('have.attr', 'placeholder', 'Last Name').type(client.main.last_name, {force:true})
                            cy.get('.contact-form-action').find('input[name="email"]').should('have.attr', 'type', 'email').and('have.attr', 'placeholder', 'Email').type(client.main.email, {force:true})
                            cy.get('.contact-form-action').find('input[name="address"]').should('have.attr', 'type', 'text').and('have.attr', 'placeholder', 'Address').type(client.main.address, {force:true})
                            cy.get('.input-items.w-auto').find('select[name="country_code"]').select(client.main.country,{force:true}).log('**United Kingdom**')
                            cy.get('.input-items.w-auto').find('select[name="nationality"]').select(client.main.country, {force:true}).log('**United Kingdom**')
                        });

                        it('Filling in - Travellers Information', () => {
                            
                            cy.get('.title').eq(1).should('have.text', 'Travellers Information').and('have.css', 'font-size', '18px')
                            cy.get('.card-header').find('strong').should('contain.text', 'Adult ').and('have.length', 3).and('have.css', 'color', 'rgb(16, 98, 254)').log('**Blue**')

                            cy.get('.card-header').contains('1').should('contain.text', 'Traveller 1')
                            cy.get('.card-body').find('input[name="firstname_1"]').should('have.attr', 'type', 'text').and('have.attr', 'placeholder', 'First Name').type(client.main.first_name, {force:true})
                            cy.get('.card-body').find('input[name="lastname_1"]').should('have.attr', 'type', 'text').and('have.attr', 'placeholder', 'Last Name').type(client.main.last_name, {force:true})

                            cy.get('.card-header').contains('2').should('contain.text', 'Traveller 2')
                            cy.get('.card-body').find('select[name="title_2"]').select(client.traveller_1.status, {force:true})
                            cy.get('.card-body').find('input[name="firstname_2"]').should('have.attr', 'type', 'text').and('have.attr', 'placeholder', 'First Name').type(client.traveller_1.first_name, {force:true})
                            cy.get('.card-body').find('input[name="lastname_2"]').should('have.attr', 'type', 'text').and('have.attr', 'placeholder', 'Last Name').type(client.traveller_1.last_name, {force:true})

                            cy.get('.card-header').contains('3').should('contain.text', 'Traveller 3')
                            cy.get('.card-body').find('select[name="title_3"]').select(client.traveller_2.status, {force:true})
                          //  cy.get('.card-body').find('input[name="firstname_3"]').should('have.attr', 'type', 'text').and('have.attr', 'placeholder', 'First Name').type(client.traveller_2.first_name, {force:true})
                            cy.get('.card-body').find('input[name="lastname_3"]').should('have.attr', 'type', 'text').and('have.attr', 'placeholder', 'Last Name').type(client.traveller_2.last_name, {force:true})

                        });

                        it('Picking Payment Method: Pay Later', () => {

                            cy.get('.title').eq(2).should('have.text', 'Payment Method').and('have.css', 'font-size', '18px')
                            cy.get('.gateway_paypal').find('input[type="radio"]').check({force:true}).should('be.checked').and('have.value', 'paypal')
                            cy.get('.gateway_paypal').find('strong').should('have.text', 'paypal')
                            cy.get('.gateway_paypal').find('img').should('have.attr', 'alt', 'paypal')

                            /*
                            cy.get('.gateway_pay-later').find('input[type="radio"]').check({force:true}).should('be.checked').and('have.value', 'pay-later')
                            cy.get('.gateway_pay-later').find('strong').should('have.text', 'pay later')
                            cy.get('.gateway_pay-later').find('img').should('have.attr', 'alt', 'pay-later')
*/
                        });

                        it('Validate checkbox and button', () => {
                            cy.get('.custom-checkbox').find('input[type="checkbox"]').as('checkbox')
                            cy.get('@checkbox').should('not.be.checked')
                            cy.get('#booking').invoke('css', 'background').then((color) =>{
                                cy.log(color)
                                cy.get('#booking').should('have.attr', 'disabled')
                                expect(color).to.deep.includes('rgb(238, 238, 238)', 'Blank color (button disabled)')
                            })
                            cy.get('@checkbox').check({force:true}).should('be.checked')
                            cy.get('#booking').invoke('css', 'background-color').then((color) =>{
                                cy.log(color)
                                    cy.get('#booking').should('not.have.attr', 'disabled')
                                    cy.get('#booking').click({force:true}).invoke('attr', 'required').then((req) =>{
                                        cy.log(req)
                                    })
                                })
                            
                        });
                    });

                });


    });
 

    });

})
