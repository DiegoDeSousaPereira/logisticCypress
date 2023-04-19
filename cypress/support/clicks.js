// Acessa a página de Roteirização V1
Cypress.Commands.add('clickRoteirizacaoV1', () => {
    cy.visit('/');
    cy.get(':nth-child(3) > .sidebar-header > span').click();
    cy.get('h3').should('have.text', 'Roteirização');
});

// Acessa a lista de motoristas
Cypress.Commands.add('clickDriverList', () => {
    cy.visit('/');
    cy.get(':nth-child(8) > .sidebar-header > .fa').click();
    cy.get('.sidebar-submenu > :nth-child(4) > a').click();
});

// Acessa a lista de ajudantes
Cypress.Commands.add('clickHelperList', () => {
    cy.visit('/');
    cy.get(':nth-child(8) > .sidebar-header > .fa').click();
    cy.get('.sidebar-submenu > :nth-child(5) > a').click();
});

// Acessa a lista de regiões e verifica a presença da "Região 14.1"
Cypress.Commands.add('clickRegionList', () => {
    cy.visit('/');
    cy.contains('a', 'Cadastros').click();
    cy.contains('a', 'Regiões').click();
    cy.url().should('eq', 'https://logistic.kdabraqa.com/cadastros/regioes');
    cy.get('h3').should('have.text', 'Regiões');
    cy.get('input.form-control-sm.form-control').first().type('Região 14.1' + '{enter}');
    cy.contains('Região 14.1').should('have.length', 1);
    cy.get('[role="row"]').should('have.length', 31);
});

// Acessa a lista de empresas
Cypress.Commands.add('clickCompanyList', () => {
    cy.visit('/');
    cy.get(':nth-child(8) > .sidebar-header > .fa').click();
    cy.get('li.active > .sidebar-submenu > :nth-child(2) > a').click();
});

// Acessa a lista de veículos
Cypress.Commands.add('clickVehicleList', () => {
    cy.visit('/');
    cy.get(':nth-child(8) > .sidebar-header > .fa').click();
    cy.get('.sidebar-submenu > :nth-child(3) > a').click();
});