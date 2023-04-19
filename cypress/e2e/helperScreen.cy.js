import SignupPage from '../pages/SignupPage'
var signup = new SignupPage

describe('Tela de ajudante', function () {
    beforeEach(function () {
        cy.fixture('mass').then((massa_de_dados) => {
            this.mass = massa_de_dados
        })
        cy.sessionLogin() 
     
    })
    it('Verificar paginação da tela de ajudante', function () {
        cy.visit('/cadastros/ajudantes')
        cy.assertionPagination()
    })
    it('Cadastrar um ajudante', function () {
        cy.clickHelperList()
        cy.uploadImage()
        signup.registerHelper(this.mass.fillForm)
    })
    it('Buscar um ajudante cadastrado', function () {
        cy.visit('/cadastros/ajudantes')
        cy.getHelperUser()
    })
    it('editar um ajudante', function () {
        //Esse visit faz uma busca na tela de ajudantes
        cy.visit('/cadastros/ajudantes#filter=general&q=teste%20automacao')
        cy.editRegister()
        cy.assertionEdit()
    })
    it('deletar um ajudante', function () {
        //Esse visit faz uma busca na tela de ajudantes
        cy.visit('/cadastros/ajudantes#filter=general&q=nao%20apague')
        cy.deleteHelper()
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
    })
})