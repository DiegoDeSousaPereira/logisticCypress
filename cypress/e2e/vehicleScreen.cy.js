import SignupPage from '../pages/SignupPage'
var signup = new SignupPage

describe('Tela do veículo', function () {
    beforeEach(function () {
        cy.sessionLogin()
        cy.fixture('mass').then((massa_de_dados) => {
            this.mass = massa_de_dados
        })
    })
    it('Verificar paginação da tela de veiculo', function () {
        cy.visit('/cadastros/veiculos')
        cy.assertionPagination()
    })
    it('Cadastrar um veiculo', function () {
        cy.clickVehicleList()
        cy.uploadImage()
        signup.registerVeiche(this.mass.formVeiche)
    })
    it('Buscar um veiculo cadastrado', function () {
        cy.visit('/cadastros/veiculos')
        cy.getUser()
    })
    it('deletar um veiculo', function () {
        //Esse visit faz uma busca na tela de veiculo
        cy.visit('/cadastros/veiculos#filter=general&q=teste%20automacao')
        cy.deleteVeiche()
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
    })
})