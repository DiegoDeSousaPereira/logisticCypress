describe('Automacao para o teste de carga',()=>{
    beforeEach(function(){
        cy.sessionLogin()
    })
    for(let i = 0; i < 251; i++){
        it('Registrando pedido na mensal', ()=> {
            cy.createMensalStress()
          })
          it('Registrando pedido na Fresh', ()=> {
             cy.createFreshStress()
          })
          it('Criando rotas', ()=> {
              cy.createRouteStress()
          })
          it('Criando a expedição', ()=>{
            cy.createExpedition()
          })
          it('Liberando a expedição', ()=>{
            cy.releaseexpedition()
          })
    }
    
})