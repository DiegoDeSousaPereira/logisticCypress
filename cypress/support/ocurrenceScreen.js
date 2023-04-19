// Verifica o formulário de ocorrência
Cypress.Commands.add('assertionFormOcurrence', () => {
    cy.visit('/financeiro/ocorrencias');
    cy.get('.sc-cZBZkQ > .fa').click();
    cy.get('.modal-footer > :nth-child(2)').click();
  
    for (let i = 0; i < 5; i++) {
      cy.get('div[class="invalid-feedback"]')
        .eq(i)
        .should('have.text', 'Obrigatório');
    }
  
    for (let i = 0; i < 3; i++) {
      cy.get('.sc-iCwjlJ').eq(i).should('have.text', 'Obrigatório');
    }
  });
  
  // Verifica o preenchimento automático no formulário de ocorrência
  Cypress.Commands.add('assertionAutoCompleteOcurrence', () => {
    cy.visit('/financeiro/ocorrencias');
    cy.get('.sc-cZBZkQ > .fa').click();
    cy.get('#order_code').type('1679059993_97688B2B_M');
    cy.get('#description').click();
    cy.get('#route').should('have.value', '1A');
    cy.get('#position_code').should('have.value', '7.0001.001-0001');
    cy.get('#event_date').should('have.value', '11/11/2023');
  });
  
  // Exclui uma ocorrência
  Cypress.Commands.add('deleteOcurrence', () => {
    cy.visit('/financeiro/ocorrencias');
    cy.get('.sc-ESoVU').first().click();
    cy.get('button[class="btn btn-lg btn-primary "]').click();
    cy.get('div[role="alert"]').should('have.text', 'Ocorrência excluída com sucesso');
  });