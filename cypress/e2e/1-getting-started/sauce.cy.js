/// <reference types="cypress" />

//Rodar classe específica de testes = npx cypress run --spec cypress/e2e/1-getting-started/sauce.cy.js

//Funcionalidade geral do teste
describe('Regressivo no site saucedemo.com', () => {

    let username = "performance_glitch_user"
    let password = "secret_sauce"
    let passReq = "Epic sadface: Password is required"
    let userReq = "Epic sadface: Username is required"
    let user_pass_notvalid= "Epic sadface: Username and password do not match any user in this service"

    //Caso de teste
    before(() => {

        cy.visit('https://www.saucedemo.com/')
    })
      
    
it('Testar erros de login', () => {


//Tentar logar apenas preenchendo o campo username
cy.get('[data-test="username"]').type(username)
cy.get('[data-test="login-button"]').click()
cy.get('[data-test="error"]').should('have.attr', 'data-test').should('eq', 'error')
cy.get('.error-message-container').should('have.text', passReq)

//Tentar logar apenas preenchendo o campo password
cy.get('[data-test="username"]').clear() //Limpar o username do teste anterior para seguir com a próxima etapa do teste
cy.get('[data-test="password"]').type(password)
cy.get('[data-test="login-button"]').click()
cy.get('[data-test="error"]').should('have.attr','data-test').should('eq', 'error')
cy.get('.error-message-container').should('have.text', userReq)

//Tentar logar utilizando username invalido e password valido
cy.get('[data-test="password"]').clear() //Limpar o password do teste anterior para seguir com a próxima etapa do teste
cy.get('[data-test="username"]').type('macarrao')
//cy.get('[data-test="password"]').type(password).invoke('attr','type', 'text') // Invocar o atributo type=password e trocar o valor password por text para poder visualizar a senha
cy.get('[data-test="password"]').type(password)
cy.get('[data-test="login-button"]').click()
cy.get('[data-test="error"]').should('have.attr','data-test').should('eq','error')
cy.get('.error-message-container').should('have.text',user_pass_notvalid)

//Tentar logar utilizando username valido e password invalido
cy.get('[data-test="password"]').clear() //Limpar o password do teste anterior para seguir com a próxima etapa do teste
cy.get('[data-test="username"]').clear()
cy.get('[data-test="username"]').type(username)
cy.get('[data-test="password"]').type('salsicha')
cy.get('[data-test="login-button"]').click()
cy.get('[data-test="error"]').should('have.attr','data-test').should('eq','error')
cy.get('.error-message-container').should('have.text',user_pass_notvalid)


})


//

it('Realizar login com sucesso', () =>{

    cy.get('[data-test="password"]').clear() //Limpar o password do teste anterior para seguir com a próxima etapa do teste
cy.get('[data-test="username"]').clear()
//Validar se o campo username possui um atributo (attr) do tipo (type) text
cy.get('[data-test="username"]').invoke('attr','type').should('eq','text')
cy.get('[data-test="username"]').type(username) //digitar o usuário no campo username
//Validar se o campo username possui um atributo (attr) do tipo (type) text
cy.get('[data-test="password"]').invoke('attr','type').should('eq','password')
cy.get('[data-test="password"]').type(password) //digitar a senha no campo password
cy.get('[data-test="login-button"]').should('have.value','Login').click() //Validar que o valor do botão Login possui o valor "Login" no código, e clicar no botão de login
//Como se fosse o asserts do JUnit
//should('have.text', 'texto') = validar se o texto do elemento é igual ao especificado
//should('not.have.text', 'texto') = validar se o texto do elemento não é igual ao especificado 
cy.get('.title').should('have.text','Products')

})


})
