import SignupPage from '../pages/SignupPage'
var signup = new SignupPage

describe('Tela de ocorrências', function () {
    beforeEach(function () {
        cy.sessionLogin()
        cy.fixture('mass').then((massa_de_dados) => {
            this.mass = massa_de_dados
        })
       
    })
    it('Verificar auto complete do pedido no cadastro de ocorrência', function () {
        cy.assertionAutoCompleteOcurrence()
    })
    it('Cadastrar ocorrência', function () {
        signup.registerOccurrence(this.mass.formOcurrence)
    })
    it('Deletar uma ocorrência', function () {
        cy.deleteOcurrence()
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
    })
})