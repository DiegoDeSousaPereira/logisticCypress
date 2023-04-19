// Verifica o formulário de cadastro de ajudante
Cypress.Commands.add('assertionFormHelper', () => {
    cy.visit('/cadastros/ajudantes');
    cy.get('.btn-primary').click();
    cy.get('.modal-footer > .btn-primary').click();
    cy.get('.sc-cJSrbW').eq(0).should('have.text', 'Selecione a foto do ajudante');
    cy.get('.sc-cJSrbW').eq(1).should('have.text', ' Selecione um motorista ');
  
    cy.get('div[class="invalid-feedback"]').eq(0).should('have.text', 'Obrigatório');
    cy.get('div[class="invalid-feedback"]').eq(1).should('have.text', 'Por favor, insira o CPF.');
    cy.get('div[class="invalid-feedback"]').eq(2).should('have.text', 'Por favor, insira o RG.');
  
    for (let i = 3; i < 10; i++) {
      cy.get('div[class="invalid-feedback"]').eq(i).should('have.text', 'Obrigatório');
    }
  });
  
  // Deleta um ajudante
  Cypress.Commands.add('deleteHelper', () => {
    cy.get('.sc-fjdhpX').eq(1).click();
    cy.contains('button', 'Excluir').click();
    cy.get('button[class="btn btn-lg btn-primary "]').click();
    cy.contains('O ajudante foi excluído com sucesso!');
  });
  
  // Busca um ajudante pelo nome
  Cypress.Commands.add('getHelperUser', () => {
    cy.get('.form-control').type('Teste automacao{enter}').wait(5000);
    cy.contains('Teste automacao');
  });