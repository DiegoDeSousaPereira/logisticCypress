Cypress.Commands.add('assertionForecast',()=>{
    cy.visit('/previsoes')
    cy.get('h3').should('have.text', 'Previsões (Timebox)')
})
Cypress.Commands.add('assertionOrderForecast',()=>{
    cy.wait(3000)
    cy.get('[type="text"]').type('{enter}')
    cy.contains('11:00:00').should('be.visible')
    cy.contains('11:15:00').should('be.visible')
    cy.contains('11:30:00').should('be.visible')
    cy.contains('rua teste automacao - automcao logistics, São Paulo - SP').should('be.visible')
})
Cypress.Commands.add('checkBoxForecast',()=>{
 
    cy.get('input[type="checkbox"]').first().check()
    cy.get('input[type="checkbox"]').last().should('be.checked')

})

Cypress.Commands.add('assertionButton',()=>{
    cy.get('button[type="button"]').last().should('be.disabled')
})

