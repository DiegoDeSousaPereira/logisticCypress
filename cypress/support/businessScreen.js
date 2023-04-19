// Verifica se o formulário de cadastro de empresas possui validações corretas
Cypress.Commands.add('assertionFormCompany', () => {
    cy.visit('/cadastros/empresas');
    cy.get('.btn-primary').click();
    cy.get('.modal-footer > .btn-primary').click();

    // Verifica se as mensagens de erro esperadas são exibidas para cada campo obrigatório
    const errorMessages = [
        'Obrigatório',
        'Obrigatório',
        'Obrigatório',
        'Por favor, insira um Email.',
        'Por favor, insira o CEP.',
        'Por favor, insira o nome da rua.',
        'O número é obrigatório.',
        'Por favor, insira o bairro.',
        'Estado é obrigatório.',
        'A cidade é obrigatória.',
    ];

    errorMessages.forEach((message, index) => {
        cy.get('div[class="invalid-feedback"]')
            .eq(index)
            .should('have.text', message);
    });
});

// Exclui uma empresa
Cypress.Commands.add('deleteCompany', () => {
    cy.get('.sc-fjdhpX').eq(1).click();
    cy.contains('button', 'Excluir').click();
    cy.get('button[class="btn btn-lg btn-primary "]').click();

    // Verifica se a mensagem de sucesso na exclusão da empresa é exibida
    cy.contains('A empresa foi excluída com sucesso!');
});