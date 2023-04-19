import 'cypress-plugin-api';
const currentDate = new Date();
const formattedCurrentDate = currentDate.toISOString().slice(0, 10);
const dateWithoutTime = new Date(formattedCurrentDate + 'T00:00:00');
var timestamp = Math.floor(dateWithoutTime.getTime() / 1000);
timestamp = timestamp + "000"

Cypress.Commands.add('createExpedition', () => {
  cy.api({
    method: 'POST',
    url: 'https://logistic.api.kdabraqa.com/expedition/'+ formattedCurrentDate,
    headers: {
      'x-api-token': `${Cypress.env('token')}`,
      'Content-Type': 'application/json',
      'Request-Origin': 'logistc'
    },
    body:
{
      "routes": [
        `${Cypress.env('idRoute')}`
      ]
    }
  }).then((response) => {
    expect(response.status).to.eq(201)
  })
})
Cypress.Commands.add('assertionViewExpedition', () => {
    cy.visit('/expedicoes/criar')
    cy.get('h3').should('have.text', 'Criar Expedição')
    cy.get('.sc-frDJqD').type('{enter}')
    cy.get('[type="checkbox"]').should('be.visible')
})
Cypress.Commands.add('assertionCheckBackup', () => {
    cy.visit('/expedicoes/criar')
    cy.get('h3').should('have.text', 'Criar Expedição')
    cy.get('.sc-frDJqD').type('{enter}')
    cy.contains(`Motoristas backups`).click()
    //Se o checkbox estiver desmcarcado ele clica e verifica se está desmarcado
        if( cy.get('div[class="_ju7HT "]').eq(0).should('be.visible') == true   ){
            cy.get('label[class="_2-ZbH "]').eq(0).click({force: true})
            cy.get('div[class="_ju7HT _3YMB2"]').eq(0).should('be.visible')
            //Se não ele marca e verifica
        }else{
            cy.get('label[class="_2-ZbH "]').eq(0).click({force: true})
            cy.get('div[class="_ju7HT "]').eq(0).should('be.visible')
        }
})
Cypress.Commands.add('assertionViewReleaseExpedition', () => {
    cy.visit('/expedicoes/liberar')
    cy.get('h3').should('have.text', 'Liberar Expedições')
    cy.get('.sc-frDJqD').type('{enter}')
    cy.get('td').should('be.visible')
})


