describe('Testes na tela de V2', () => {
    beforeEach(function () {
        cy.sessionLogin()
    })
    it('Verificação do botão de copiar todos os pedidos', () => {
        cy.clickV2()
        cy.copyOrders()
    })
    it('Verificar lojas selecionadas', () => {
        cy.clickV2()
        cy.verifyStore()
    })
    it('Verificar pedidos não roteirizados', () => {
        let typeStore = 'Mensal'
        cy.clickV2()
        cy.registerOrder(typeStore)
        cy.registerOrder(typeStore)
        cy.reload()
        cy.calender()
        cy.orderNoRequest()
    })
    it('Atualizar previsão', () => {
        cy.clickV2()
        cy.wait(3000)
        cy.orderNoRequest()
        cy.updateRoute()
    })
    it('Lockar um pedido uma rota + atualizar previsão', () => {
        cy.clickV2()
        cy.wait(3000)
        cy.orderNoRequest()
        cy.lockOrder()
    })
    it('Salvar uma rota', () => {
        cy.clickV2()
        cy.wait(3000)
        cy.orderNoRequest()
        cy.updateRoute()
        cy.salveRoute()
    })

})