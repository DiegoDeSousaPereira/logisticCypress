import 'cypress-plugin-api';
const currentDate = new Date();
const formattedCurrentDate = currentDate.toISOString().slice(0, 10);
const dateWithoutTime = new Date(formattedCurrentDate + 'T00:00:00');
var timestamp = Math.floor(dateWithoutTime.getTime() / 1000);
timestamp = timestamp + "000";

// Verifica a data de expedição
Cypress.Commands.add('assertionDateExpeditionOrder', () => {
  cy.visit('/expedicoes/liberar');
  cy.get('.sc-frDJqD').type('24/03/2023{enter}');
  cy.get('[class="btn btn-warning btn-sm disabled"]').first().should('be.visible');
  cy.get('[class="btn btn-outline-danger btn-sm disabled"]').first().should('be.visible');
  cy.get('[class="btn btn-xs btn-link"]').eq(4).should('be.disabled');
});

// Libera expedição
Cypress.Commands.add('releaseExpedition', () => {
  cy.api({
    method: 'POST',
    url:
      'https://logistic.api.kdabraqa.com/expedition/' +
      formattedCurrentDate +
      `/${Cypress.env('idRoute')}` +
      '/release',
    headers: {
      'x-api-token': `${Cypress.env('token')}`,
      'Content-Type': 'application/json',
      'Request-Origin': 'logistc',
    },
    body: {
      scheduled: parseInt(timestamp),
      offline: false,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

// Verifica senha do supervisor
Cypress.Commands.add('verifyPasswordSupervisor', () => {
  cy.visit('/expedicoes/liberar');
  cy.get('#PasswordPopoverOfSupervisor').click();
  cy.get('h2').should('have.length', '1');
});

// Verifica senha do motorista
Cypress.Commands.add('verifyDriverPassword', () => {
  cy.get('[title="Senhas temporárias"]').eq(0).click();
  cy.get('h2')
    .eq(0)
    .invoke('text')
    .then((contagem) => {
      cy.get('h2')
        .eq(1)
        .invoke('text')
        .then((portaria) => {
          cy.get('h2')
            .eq(2)
            .invoke('text')
            .then((cancelamento) => {
              expect(contagem).not.to.equal(portaria);
              expect(contagem).not.to.equal(cancelamento);
              expect(portaria).not.to.equal(cancelamento);
            });
        });
    });
});