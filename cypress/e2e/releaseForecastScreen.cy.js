describe('Tela de liberar expedição', function () {
    beforeEach(function () {
        cy.sessionLogin()
    })
    it('Verificar tela de Liberar expedição', function () {
        cy.assertionForecast()
    })
    it('Verificar os pedidos', function () {
        cy.assertionForecast()
        cy.assertionOrderForecast()
    })
    it('Verificar button de liberar previsão', function () {
        cy.assertionForecast()
        cy.assertionOrderForecast()
        cy.checkBoxForecast()
        cy.assertionButton()
    })
})

