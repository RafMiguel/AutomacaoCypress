import { elDemo, elUniversal} from "./elementos";

 import dados_cliente from "../fixtures/dados_cliente.json"


Cypress.Commands.add('formulario',() =>{

cy.xpath(elDemo.campo_first_name).should('have.attr','placeholder','First Name').type(dados_cliente.first_name,{force:true})
cy.xpath(elDemo.campo_last_name).should('have.attr','placeholder','Last Name').type(dados_cliente.last_name,{force:true})
cy.xpath(elDemo.campo_business).should('have.attr','placeholder','Business Name').type(dados_cliente.business,{force:true})
cy.xpath(elDemo.campo_email).should('have.attr','placeholder','Email').type(dados_cliente.email,{force:true})

//Armazenar o valor dos números dentro dos elementos #numb1 e #numb2 para utiliza-los numa soma e gerar o resultado requerido
cy.get(elDemo.digitos_resultado).find(elDemo.primeiro_digito).invoke('text').then((numb1) => {
    expect(numb1).match(/^[0-9]*$/) // Espero que a variável 'numb1' (que está armazenando o valor (texto) contido em #numb1) combine com o resultado que esteja entre 0 e 9 (/^[0-9]*$/)
cy.get(elDemo.digitos_resultado).find(elDemo.segundo_digito).invoke('text').then((numb2) =>{
    expect(numb2).match(/^[0-9]*$/)

//Abaixo foi criada duas variaveis (n1_int e n2_int) que servirão para convertermos (através do parseInt) os textos obtidos das variaveis numb1 e numb2 em números inteiros para podermos somá-los.
//Sem converter os textos obtidos em números inteiros, o resultado da soma seria simplesmente a junção do valor (texto) de numb1 com o valor (texto) de numb2. Exemplo: 5(numb1) + 5(numb2), sem convertermos as variaveis para int, traria o resultado 55 ao invés de 10.
var n1_int = parseInt(numb1)
var n2_int = parseInt(numb2)
var result = n1_int + n2_int

cy.get(elDemo.campo_resultado).should('have.attr','placeholder','Result ?').type(result,{force:true})

})


  });



//cy.xpath('.//button[text()="Submit"]').click({force:true})

})





Cypress.Commands.add('login',() =>{

cy.visit('/login')
cy.iframe().find('.recaptcha-checkbox goog-inline-block recaptcha-checkbox-unchecked rc-anchor-checkbox')
cy.xpath('.//input[@placeholder="name@example.com"]').type('rafaelmiguel11@hotmail.com')
cy.xpath('.//input[@placeholder="Password"]').type('Theralf_9k')
cy.get('.rc-anchor-center-item.rc-anchor-checkbox-holder')



})