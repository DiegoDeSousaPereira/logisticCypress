Cypress.Commands.add('assertionEdit',()=>{
        cy.reload()
        cy.get('.form-control').clear().type('nao apague' + '{enter}')
        cy.contains('nao apague')
})

Cypress.Commands.add('editRegister',()=>{
        cy.get('.sc-fjdhpX').eq(1).click()
        cy.contains(`button`, `Editar`).click()
        cy.get('#name').clear().type('nao apague')
        cy.get('.modal-footer > .btn-primary').click()
        cy.get('div[class="loader-box"]').as('loader');
        cy.get('@loader').should('not.exist');
})

Cypress.Commands.add('getUser',()=>{
        cy.get('.form-control').type('Teste automacao')
        cy.get('button[class="d-flex m-l-10 btn btn-secondary"]').click()
        cy.contains('Teste automacao')
})
Cypress.Commands.add('assertionPagination',()=>{
        cy.get('span[aria-hidden="true"]').last().click()
        cy.get('li[class="page-item disabled"]').should('have.length', 2)
        cy.get('div[role="progressbar"]').as('loader')
        cy.get('@loader').should('not.exist');
        cy.get('td').should('not.contain', 'Teste paginacao nao exclua ou edite') 
})

Cypress.Commands.add('uploadImage',()=>{
        const upload = ('image.jpg')
        cy.get('.btn-primary').click()
        cy.get('.sc-hzDkRC').selectFile(upload, {
            action: 'drag-drop'
        })
})
