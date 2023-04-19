describe('Automação do fluxo de criação de rota', function () {
    beforeEach(function () {
        cy.sessionLogin()
    })
    for (let i = 0; i < 10; i++) {
        it('Registrando pedido na mensal', function () {
            cy.clickV2()
            let typeStore = 'Mensal'
            cy.registerOrder(typeStore).then(() => {
            }).then(() => {
                Cypress.env('orderMensal', Cypress.env('order'))
                Cypress.env('pointMensal', Cypress.env('point'))
            });
        })
        it('Registrando pedido na Fresh', function () {
            cy.clickV2()
            let typeStore = 'Fresh'
            cy.registerOrder(typeStore).then(() => {
                Cypress.env('orderFresh', Cypress.env('order'))
                Cypress.env('pointFresh', Cypress.env('point'))
            });
        })
        it('Registrando pedido na Pontual', function () {
            cy.clickV2()
            let typeStore = 'Pontual'
            cy.registerOrder(typeStore).then(() => {
                Cypress.env('orderPontual', Cypress.env('order'))
                Cypress.env('pointPontual', Cypress.env('point'))
            });
        })
        it('Registrando pedido no Mini Mercado', function () {
            cy.clickV2()
            let typeStore = 'Mini Mercado'
            cy.registerOrder(typeStore).then(() => {
                Cypress.env('orderMiniMercado', Cypress.env('order'))
                Cypress.env('pointMiniMercado', Cypress.env('point'))
            });
        })
        it('Registrando pedido na Expressa', function () {
            cy.clickV2()
            let typeStore = 'Expressa'
            cy.registerOrder(typeStore).then(() => {
                Cypress.env('orderExpressa', Cypress.env('order'))
                Cypress.env('pointExpressa', Cypress.env('point'))
            });
        })

        it('Criação de rota', function () {
            cy.createRoute()
        })
        it('Gerar números de rota', function () {
            cy.generateNumberRoute()
        })
        it('criar a expedição', function(){
            cy.createExpedition()
        })
        it('Liberar expedição', function(){
            cy.releaseExpedition()
        })
    }
})