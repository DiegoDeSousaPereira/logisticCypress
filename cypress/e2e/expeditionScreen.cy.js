describe('Terminio de criação do pedido nas lojas', function () {
    beforeEach(function () {
        cy.sessionLogin()
    })    
    it('Visualização da tela de criação de expedição', function () {
        cy.assertionViewExpedition()
    })
    it('Marcação de motorista como backup', function () {
        cy.assertionCheckBackup()
    })
    it('Visualização da tela de liberar expedição', function () {
        cy.assertionViewReleaseExpedition()
    })
    it('Verificar se edição e exclusão de pedidos passados está desabilitado', function () {
        cy.assertionDateExpeditionOrder()
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
    })
    it('Verificar a senhas do supervisor', () => {
        cy.verifyPasswordSupervisor()
    })
    it('Verificar se as senhas são diferentes na tela de liberar expedição', () => {
        cy.assertionViewReleaseExpedition()
        cy.verifyDriverPassword()        
    })
})