// Verifica se todos os campos obrigatórios estão sendo validados corretamente no formulário de cadastro
Cypress.Commands.add('assertionFormRegisterValue', () => {
    cy.visit('/financeiro/cadastro');
    cy.get('.sc-jKmXuR').click();
    cy.get('button[class="btn btn-danger"]').click();
    cy.get('.sc-jKmXuR').click();
    cy.get('.btn-primary').click();
    for (let i = 3; i < 18; i++) {
        cy.get('div[class="invalid-feedback"]').eq(i).should('have.text', 'Obrigatório');
    }
    cy.get('div[class="invalid-feedback"]').eq(0).should('have.text', 'Selecione uma região.');
    cy.get('div[class="invalid-feedback"]').eq(1).should('have.text', 'Selecione um veículo');
    cy.get('div[class="invalid-feedback"]').eq(2).should('have.text', 'Seleciona um tipo de carregamento');
});

// Registra um novo valor no formulário de cadastro de valores
Cypress.Commands.add('registerNewValue', () => {
    const value = 1;
    cy.visit('/');
    cy.contains(`span`, `Financeiro`).click();
    cy.get('.active > .sidebar-submenu > :nth-child(1) > a').click();
    cy.url().should('eq', 'https://logistic.kdabraqa.com/financeiro/cadastro');
    cy.get('h3').should('have.text', 'Cadastro de valores');
    cy.get('.sc-jKmXuR').click();
    cy.get('[name="region"]').select('FC1');
    cy.get('#vehicleId').select('VUC');
    cy.get('#loadTypeId').select('Convencional');

    // Insere os valores no formulário
    cy.get('#dailyValueRegular').type(value);
    cy.get('#dailyValueSaturday').type(value);
    cy.get('#dailyValueBackup').type(value);
    cy.get('#quilometersLimitRegular').type(value);
    cy.get('#quilometersLimitSaturday').type(value);
    cy.get('#quilometersLimitBackup').type(value);
    cy.get('#quilometerValueRegular').type(value);
    cy.get('#quilometerValueSaturday').type(value);
    cy.get('#quilometerValueBackup').type(value);
    cy.get('#invoicesLimitRegular').type(value);
    cy.get('#invoicesLimitSaturday').type(value);
    cy.get('#invoicesLimitBackup').type(value);
    cy.get('#invoiceValueRegular').type(value);
    cy.get('#invoiceValueSaturday').type(value);
    cy.get('#invoiceValueBackup').type(value);

    // Intercepta a requisição de POST e verifica se o status é 201
    cy.intercept('POST', '/finances/configurations').as('request');
    cy.get('.btn-primary').click();
    cy.wait('@request');
    cy.get('@request').its('response.statusCode').should('eq', 201);
    cy.contains('Convencional');
});

// Deleta um valor cadastrado e verifica se ele foi removido
Cypress.Commands.add('deleteValue', () => {
    cy.visit('/financeiro/cadastro');
    cy.get('.sc-ccSCjj').eq(1).click();
    cy.get(':nth-child(2) > .btn').click();
    cy.contains('Furgão').should('have.length', 0);
});

Cypress.Commands.add('editValueRegister', () => {
    cy.visit('/financeiro/cadastro')
    cy.get('.sc-ccSCjj').first().click()
    cy.get('#vehicleId').select('Furgão')
    cy.get('#loadTypeId').select('Fresh')
    cy.get('.btn-primary').click()
    cy.get('div[role="alert"]').should('have.text', 'Configuração atualizada com sucesso.')
})