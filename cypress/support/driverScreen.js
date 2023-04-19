// Adiciona comando de teste para verificar formulário de cadastro de motorista
Cypress.Commands.add('assertionFormDriver', () => {
    cy.visit('/cadastros/motoristas');
    cy.get('.btn-primary').click();
    
    // Clica no botão de salvar sem preencher os campos
    cy.get('[style="float: right;"] > .btn-primary').click({force:true});
    
    // Lista de mensagens de erro esperadas
    const errorMsgs = [
        'Selecione a foto do motorista',
        'Por favor, insira o nome do grupo.',
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
        'Por favor, insira o nome do motorista.',
        'Por favor, insira o CPF.',
        'Por favor, insira o RG.',
        'Por favor, insira a CNH.',
        'Obrigatório',
        'Por favor, insira o CEP.',
        'Por favor, insira o nome da rua.',
        'O número é obrigatório.',
        'Por favor, insira o bairro.',
        'Estado é obrigatório.',
        'A cidade é obrigatória.',
        'Por favor, insira a Região.',
        'Por favor, insira o telefone.',
        'Por favor, insira um Email.'
    ];

    // Verifica se as mensagens de erro estão sendo exibidas corretamente
    errorMsgs.forEach((msg, idx) => {
        cy.get('.sc-eqIVtm').eq(idx).should('have.text', msg);
    });
});
Cypress.Commands.add('editRegisterDriver',()=>{
        cy.get('.sc-fjdhpX').eq(3).click()
        cy.contains(`button`, `Editar`).click()
        cy.get('#name').clear().type('nao apague')
        cy.get('.modal-footer > .btn-primary').click()
        cy.get('div[class="loader-box"]').as('loader');
        cy.get('@loader').should('not.exist');
})

// Adiciona comando de teste para excluir motorista
Cypress.Commands.add('deleteDriver', () => {
    // Clica no botão de excluir motorista
    cy.get('.sc-fjdhpX').eq(3).click();
    cy.contains(`button`, `Excluir`).click();
    
    // Confirma a exclusão
    cy.get('button[class="btn btn-lg btn-primary "]').click();
    
    // Verifica se a mensagem de sucesso foi exibida
    cy.contains('O motorista foi excluído com sucesso!');
});