describe('Tela de região', function () {
    beforeEach(function () {
        cy.sessionLogin()
    })
    it('Buscar na tela de região', function () {
        cy.clickRegionList()
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
    })
})