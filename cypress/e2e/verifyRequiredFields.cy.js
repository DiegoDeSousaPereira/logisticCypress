describe('Verificar Campos Obrigatórios', function () {
    beforeEach(function () {
        cy.sessionLogin()
    })
    it('Verificar tela roteirização V1', function () {
        cy.clickRoteirizacaoV1()
    })
    it('Verificar obrigatóriedade dos campos do cadastro da empresa', function () {
        cy.assertionFormCompany()
    })
    it('Verificar obrigatóriedade dos campos do cadastro da veiculo', function () {
        cy.assertionFormVehicle()
    })
    it('Verificar obrigatóriedade dos campos do cadastro do motorista', function () {
        cy.assertionFormDriver()
    })
    it('Verificar obrigatóriedade dos campos do cadastro do ajudantes', function () {
        cy.assertionFormHelper()
    })
    it('Verificar obrigatóriedade dos campos do cadastro de valores', function () {
        cy.assertionFormRegisterValue()
    })
    it('Verificar obrigatóriedade dos campos do cadastro do ocorrência', function () {
        cy.assertionFormOcurrence()
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
    })
})