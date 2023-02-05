/// <reference types="cypress"/>


describe('Validações PHPTravels', () => {


  it('sdsdsd', () => {
    cy.visit('/')
    cy.formulario()
/*
cy.get('.df').find('#numb1').invoke('text').then((numb1) => {
  expect(numb1).match(/^[0-9]*$/); // Espero que a variável 'numb1' (que está armazenando o valor (texto) contido em #numb1) combine com o resultado que esteja entre 0 e 9 (/^[0-9]*$/)

cy.get('.df').find('#numb2').invoke('text').then((numb2) => {
expect(numb2).match(/^[0-9]*$/)

//Abaixo foi criada duas variaveis (n1_int e n2_int) que servirão para convertermos (através do parseInt) os textos obtidos das variaveis numb1 e numb2 em números inteiros para podermos somá-los.
//Sem converter os textos obtidos em números inteiros, o resultado da soma seria simplesmente a junção do valor (texto) de numb1 com o valor (texto) de numb2. Exemplo: 5(numb1) + 5(numb2), sem convertermos as variaveis para int, traria o resultado 55 ao invés de 10.
var n1_int = parseInt(numb1)
var n2_int = parseInt(numb2)
var result = n1_int + n2_int

cy.get('#number').type(result,{force:true})
  })
  
})*/

  });








/*
let numb1 = cy.xpath('.//span[contains(@id, "numb1")]')
cy.xpath('.//input[@id="number"]').type(numb1)
console.log($numb1.te)
*/

})