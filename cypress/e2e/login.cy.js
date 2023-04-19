import SignupPage from '../pages/SignupPage'
var signup = new SignupPage

describe('Testes de Login', function () {
    beforeEach(function () {
        cy.sessionLogin()
        cy.fixture('mass').then((massa_de_dados) => {
            this.mass = massa_de_dados
        })
    })
    it('Login com sucesso', function () {
        signup.login(this.mass.registration)
        cy.assertionLoginSucess()  

    })
    it('Login com user inválido', function () {
        signup.login(this.mass.invalidUser)
        cy.assertionLoginFailed()
    })
    it('Login com senha inválida', function () {
        signup.login(this.mass.invalidPassword)
        cy.assertionLoginFailed()
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
    })
    
})
