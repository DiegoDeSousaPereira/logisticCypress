describe('Tela de cadastro de valores', function () {
    beforeEach(function () {
        cy.sessionLogin()       
    })
    it('Cadastrar um valor', function () {
        cy.registerNewValue()
    })
    it('Editar um valor já cadastrado', function () {
        cy.editValueRegister()
    })
    it('Excluir um valor', function () {
        cy.deleteValue()
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
    })
})