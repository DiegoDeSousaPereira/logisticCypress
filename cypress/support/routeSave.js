// Verifica a visualização das rotas salvas e filtra as rotas pressionando Enter
Cypress.Commands.add('ViewRouteSave', () => {
    cy.visit('/rotas');
    cy.get('h3').should('have.text', 'Rotas Salvas');
    cy.get('.sc-frDJqD').type('{enter}');
});

// Copia a rota e verifica se o alerta de cópia bem-sucedida é exibido
Cypress.Commands.add('copyRoute', () => {
    cy.get(':nth-child(3) > .btn > .fa').as('loader');
    cy.get('@loader').should('be.visible');
    cy.get(':nth-child(3) > .btn > .fa').click();
    cy.get('div[role="alert"]').should('be.visible');
});

// Verifica se os horários dos pedidos são exibidos corretamente na rota
Cypress.Commands.add('assertionTimeOrder', () => {
    cy.contains(`Rota ${Cypress.env('number')}A`).click();
    cy.contains('11:21').should('be.visible')
    .then(($el) => {
        $el[0].scrollIntoView();
    });
    cy.contains('11:21').should('be.visible');
    cy.contains('11:42').should('be.visible');
    cy.contains('11:57').should('be.visible');
    cy.contains('12:12').should('be.visible');
    cy.contains('12:27').should('be.visible');
    cy.contains('13:04').should('be.visible');
});

// Move o pedido para outra rota e verifica se o horário do pedido não existe mais na rota original
Cypress.Commands.add('moveOrder', () => {
    cy.get('button[title="Mover a rota"]').first().click();
    cy.get('.list-group-item-action').first().click();
    cy.get('.fa-save').click();
    cy.contains('13:04').should('not.exist');
});

// Exclui o pedido da rota e verifica se o horário do pedido não existe mais na rota
Cypress.Commands.add('deleteOrder', () => {
    cy.contains(`Rota ${Cypress.env('number')}A`).click();
    cy.get('button[title="Deletar a rota"]').first().click();
    cy.get('.fa-save').click();
    cy.contains('12:27').should('not.exist');
});