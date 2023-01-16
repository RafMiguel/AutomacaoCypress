const elLogin = require('./elementos.cy').ElementosLogin;
const elProdutos = require('./elementos.cy').ElementosProdutos;
 
 export class Metodos {

acessarURL(){
    cy.visit('https://www.saucedemo.com/')
}

digitar(elemento,texto){

    cy.get(elemento).type(texto)

    //Mensagens de erro
    //cy.get(elLogin.erro_login).should('have.attr', tipo_attr).should('eq', valor_attr)
    //cy.get(elLogin.msg_erro_login).should('have.text', msg_erro)

}

validar_attr(elemento,attr,valor_atributo){

cy.get(elemento).should('have.attr',attr, valor_atributo)

}

validar_texto(elemento,info_esperada){

    cy.get(elemento).should('have.text',info_esperada)
    
    }

clicar(elemento){

    cy.get(elemento).click()

}

deletar(elemento){

cy.get(elemento).clear()

}


}

export default new Metodos() //Assim a classe Login poderá ser utilizada em outras páginas