import SignupPage from '../pages/SignupPage'
var signup = new SignupPage

describe('Tela de motorista', function () {
    beforeEach(function () {
        cy.sessionLogin()
        cy.fixture('mass').then((massa_de_dados) => {
            this.mass = massa_de_dados
        })
       
    })
    it('Verificar paginação da tela de motorista', function () {
        cy.visit('/cadastros/motoristas')
        cy.assertionPagination()
    })
    it('Cadastrar um motorista', function () {
        cy.clickDriverList()
        cy.uploadImage()
        signup.resgisterDriver(this.mass.fillForm)
    })
    it('Buscar um motorista cadastrado', function () {
        cy.visit('/cadastros/motoristas')
        cy.getUser()
    })
    it('editar um motorista', function () {
        //Esse visit faz uma busca na tela de motorista
        cy.visit('/cadastros/motoristas#filter=general&q=teste%20automacao')
        cy.editRegisterDriver()
        cy.assertionEdit()

    })
    it('deletar um motorista', function () {
        //Esse visit faz uma busca na tela de motorista
        cy.visit('/cadastros/motoristas#filter=general&q=nao%20apague')
        cy.deleteDriver()
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
    })
})