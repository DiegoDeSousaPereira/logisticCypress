// Verifica se os campos obrigatórios do formulário de veículos são exibidos com mensagens de erro
Cypress.Commands.add('assertionFormVehicle', () => {
    cy.visit('/cadastros/veiculos');
    cy.get('.btn-primary').click();
    cy.get('.modal-footer > .btn-primary').click();
    cy.get('div[class="invalid-feedback"]').eq(0).should('have.text', 'Obrigatório');
    cy.get('div[class="invalid-feedback"]').eq(1).should('have.text', 'Obrigatório');
});

// Exclui o veículo e verifica a mensagem de sucesso na exclusão
Cypress.Commands.add('deleteVeiche', () => {
    cy.get('.sc-fjdhpX').eq(1).click();
    cy.contains(`button`, `Excluir`).click();
    cy.get('button[class="btn btn-lg btn-primary "]').click();
    cy.contains('O veículo foi excluído com sucesso!');
});