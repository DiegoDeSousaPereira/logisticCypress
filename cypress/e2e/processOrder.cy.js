describe('Criando pedido nas lojas', function () {
    beforeEach(function () {
        cy.sessionLogin()
      
    })
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
    it('Criando uma rota', function(){
        cy.createRoute() 
     })
    it('Gerando número de rotas', function(){
       cy.generateNumberRoute() 
    })
    it('Criar expedição', function(){
        cy.createExpedition()
    })
    it('Liberar expedição', function(){
        cy.releaseExpedition()
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
    })

    context('routeSaveScreen', () => {
        beforeEach(function () {
            cy.clearAllSessionStorage()
            cy.sessionLogin()
            cy.intercept({ url: 'https://logistic.api.kdabraqa.com/*' }, (req) => {
            req.continue((res) => {            
            if (res.statusCode === 401) {
                cy.clearAllLocalStorage()
                cy.sessionLogin()
              }
            });
          });
        })
     
        it('Verificar tempo de entrega', function () {
            cy.ViewRouteSave()
            cy.assertionTimeOrder()
        })
        it('Mover um pedido da sua rota original', function () {
            cy.ViewRouteSave()
            cy.assertionTimeOrder()
            cy.moveOrder()
        })
        it('Apagar um pedido da sua rota', function () {
            cy.ViewRouteSave()
            cy.deleteOrder()
        
        })
        it('Verificar função de copiar', function () {
            cy.ViewRouteSave()
            cy.copyRoute()
            cy.clearAllCookies()
            cy.clearAllLocalStorage()
        })
    })
    
})