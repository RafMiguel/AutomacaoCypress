/// <reference types="cypress"/>
import { elDemo, elUniversal } from "../support/elementos";

describe("Validações PHPTravels", () => {
    const client = "cypress/fixtures/dados_cliente.json";
    const texts = "cypress/fixtures/estaticos.json";

    before(() => {
        cy.rota(".com/demo");

        cy.xpath(elUniversal.titulo)
            .should("have.text", "PHPTRAVELS Demo")
            .get(elUniversal.sub_titulo)
            .should(
                "have.text",
                "Test drive online the demo product available with complete features"
            )
            .shot("1 - Demo");
    });
    context("Página Demo - Alerta", () => {
        it("Validar alerta: Type your first name", () => {
            cy.xpath(elDemo.botao_submit).click({ force: true });
            cy.on("window:alert", (first_name_alert) => {
                expect(first_name_alert).to.contain("Please type your first name");
            });
            cy.shot("2 - Demo - Alerta (First Name)");
        });

        it("Validar alerta: Type your last name", () => {
            cy.readFile(client)
                .its("first_name")
                .then((first_name) => {
                    cy.xpath(elDemo.campo_first_name).type(first_name, {
                        force: true,
                    });
                });

            cy.xpath(elDemo.botao_submit).click({ force: true });
            cy.on("window:alert", (last_name_alert) => {
                expect(last_name_alert).to.contains("Please type your last name");
            });
            cy.shot("3 - Demo - Alerts (Last Name)");
        });

        it("Validar alerta: Type your business", () => {
            cy.readFile(client)
                .its("last_name")
                .then((last_name) => {
                    cy.xpath(elDemo.campo_last_name).type(last_name, {
                        force: true,
                    });
                });

            cy.xpath(elDemo.botao_submit).click({ force: true });
            cy.on("window:alert", (last_name_alert) => {
                expect(last_name_alert).to.contains("Please type your business name");
            });
            cy.shot("4 - Demo - Alerts (Business)");
        });

        it("Validar alerta: Type your email", () => {
            cy.readFile(client)
                .its("business")
                .then((business) => {
                    cy.xpath(elDemo.campo_business).type(business, {
                        force: true,
                    });
                });

            cy.xpath(elDemo.botao_submit).click({ force: true });
            cy.on("window:alert", (business_alert) => {
                expect(business_alert).to.contains("Please type your email name");
            });
            cy.shot("5 - Demo - Alerts (Email)");
        });
    });

    context("Demo - Preenchimento correto do formulário", () => {
        before(() => {
            cy.limpar();
        });
        it("Preencher formulário", () => {
            //Validar título do formulário
            cy.get(elDemo.titulo_form)
                .find("strong")
                .should("have.text", "Instant Demo")
                .and("have.css", "font-weight", "700");
            cy.get(elDemo.titulo_form).invoke("text").should("contain", "Request Form");
            //Validar campos do formulário
            cy.readFile(client)
                .its("first_name")
                .then((first_name) => {
                    cy.xpath(elDemo.campo_first_name)
                        .should("have.attr", "placeholder", "First Name")
                        .type(first_name, { force: true });
                });
            cy.readFile(client)
                .its("last_name")
                .then((last_name) => {
                    cy.xpath(elDemo.campo_last_name)
                        .should("have.attr", "placeholder", "Last Name")
                        .type(last_name, { force: true });
                });

            cy.readFile(client)
                .its("business")
                .then((business) => {
                    cy.xpath(elDemo.campo_business)
                        .should("have.attr", "placeholder", "Business Name")
                        .type(business, { force: true });
                });
            cy.readFile(client)
                .its("email")
                .then((email) => {
                    cy.xpath(elDemo.campo_email)
                        .should("have.attr", "placeholder", "Email")
                        .type(email, { force: true });
                });

            //Armazenar o valor dos números dentro dos elementos #numb1 e #numb2 para utiliza-los numa soma e gerar o resultado requerido
            cy.get(elDemo.digitos_resultado)
                .find(elDemo.primeiro_digito)
                .should("be.visible")
                .invoke("text")
                .then((numb1) => {
                    expect(numb1).match(/^[0-9]*$/); // Espero que a variável 'numb1' (que está armazenando o valor (texto) contido em #numb1) combine com o resultado que esteja entre 0 e 9 (/^[0-9]*$/)
                    cy.get(elDemo.digitos_resultado)
                        .find(elDemo.segundo_digito)
                        .should("be.visible")
                        .invoke("text")
                        .then((numb2) => {
                            expect(numb2).match(/^[0-9]*$/);

                            //Abaixo foi criada duas variaveis (n1_int e n2_int) que servirão para convertermos (através do parseInt) os textos obtidos das variaveis numb1 e numb2 em números inteiros para podermos somá-los.
                            //Sem converter os textos obtidos em números inteiros, o resultado da soma seria simplesmente a junção do valor (texto) de numb1 com o valor (texto) de numb2. Exemplo: 5(numb1) + 5(numb2), sem convertermos as variaveis para int, traria o resultado 55 ao invés de 10.
                            var n1_int = parseInt(numb1);
                            var n2_int = parseInt(numb2);
                            var result = n1_int + n2_int;

                            cy.get(elDemo.campo_resultado)
                                .should("be.visible")
                                .and("have.attr", "placeholder", "Result ?")
                                .type(result, { force: true })
                                .shot("6 - Demo - Formulario");
                        });
                });

            cy.xpath(elDemo.botao_submit).click({ force: true });
            cy.xpath(elDemo.titulo_thankYou)
                .should("be.visible")
                .and("contain.text", "Thank you!");
            cy.readFile(texts)
                .its("thank_you_text")
                .then((thank_you_text) => {
                    cy.xpath(elDemo.thanks_text)
                        .should("be.visible")
                        .and("have.text", thank_you_text)
                        .shot("7 - Demo - Thank You");
                });
        });
    });
    context("Cores do formulario", () => {
        it("Validar cor do container do formulario", () => {
            cy.color_check(".demo_form.bgb.br8.p3", "background-color", "004bff");
        });
        it("Validar cor do botão submit", () => {
            cy.xpath(elDemo.botao_submit).invoke('css', 'background').then((color) =>{
                expect(color).to.deep.include('rgb(57, 57, 57)')
            })
           // cy.color_check_xpath(elDemo.botao_submit, "background", "393939");
        });
    });
});

after(() => {
    cy.shot("End Test");
});
