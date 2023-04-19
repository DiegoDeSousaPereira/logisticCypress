import SignupPage from '../pages/SignupPage'
var signup = new SignupPage

describe('Tela da empresa', function () {
    beforeEach(function () {
        cy.sessionLogin()
        cy.fixture('mass').then((massa_de_dados) => {
            this.mass = massa_de_dados
        })
      
    })
    it('Verificar paginação da tela de empresas', function () {
        cy.visit('/cadastros/empresas')
        cy.assertionPagination()
    })
    it('Cadastrar uma empresa', function () {
        cy.clickCompanyList()
        signup.registerBusiness(this.mass.formBusiness)
    })
    it('Buscar uma empresa cadastrada', function () {
        cy.visit('/cadastros/empresas')
        cy.getUser()
    })
    it('editar uma empresa', function () {
        //Esse visit faz uma busca na tela de empresas
        cy.visit('/cadastros/empresas#filter=general&q=teste%20automacao')
        cy.editRegister()
        cy.assertionEdit()
    })
    it('deletar uma empresa', function () {
        //Esse visit faz uma busca na tela de empresas
        cy.visit('/cadastros/empresas#filter=general&q=nao%20apague')
        cy.deleteCompany()
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
    })
})