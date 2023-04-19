import { faker } from '@faker-js/faker';
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
const plateRamdom = faker.vehicle.vin() // => "JKPUKVHUDLRC49382"
const phoneRamdom = faker.phone.imei() // => "55-786858-466342-8"

class SignupPage {
    login(mass) {
        cy.clearLocalStorage()
        cy.visit('/')
        cy.get('.btn-xs').click()
        cy.get("#email").type(mass.user)
        cy.get("#password").type(mass.password, { log: false })
        cy.get(".btn-primary").click()
    }
 
    registerOccurrence(mass) {
        cy.visit('/')
        cy.get(':nth-child(9) > .sidebar-header').click()
        cy.get('.active > .sidebar-submenu > :nth-child(2) > a').click()
        cy.get('h3').should('have.text', 'Ocorrências')
        cy.get('.sc-cZBZkQ > .fa').click()
        cy.get('#category').select(mass.occurrenceCategory)
        cy.get('#subcategory').select(mass.subCategory)
        cy.get('#source').select(mass.origin)
        cy.get('#event_date').type(mass.date)
        cy.get('#noticed').select(mass.warnedAdvance)
        cy.get('#discount_value').type(mass.discountAmount)
        cy.get('#description').type(mass.describe)
        cy.get('.css-tlfecz-indicatorContainer').wait(2000).type('{downArrow}{enter}')
        //Nessa parte do codigo ele intercepta a requisição de POST da criacao e verifica se o status é 201
        cy.intercept('POST', '/finances/events').as('request')
        cy.get('.modal-footer > :nth-child(2)').click({force: true})
        cy.get('div[role="alert"]').should('have.text', 'Ocorrência registrada com sucesso')
        cy.wait('@request')
        cy.get('@request').its('response.statusCode').should('eq', 201)
    }
    registerBusiness(mass) {
        cy.get('.btn-primary').click()
        cy.get('#name').type(mass.name).wait(200)
        cy.get('#zip_code').type(mass.zipCode).wait(200)
        cy.get('#legal_name').type(mass.corporateName).wait(1500)
        cy.get('#cnpj').type(mass.cnpj).wait(250)
        cy.get('#street_number').type(mass.number).wait(250)
        cy.get('#email').type(mass.email).wait(250)
        //Nessa parte do codigo ele intercepta a requisição de POST da criacao e verifica se o status é 201
        cy.intercept('POST', '/company').as('request')
        cy.get('.modal-footer > .btn-primary').click()
        cy.get('div[class="loader-box"]').as('loader');
        cy.get('@loader').should('not.exist');
        cy.wait('@request')
        cy.get('@request').its('response.statusCode').should('eq', 201)
    }
    registerHelper(mass) {
        cy.get('.css-tlfecz-indicatorContainer').type('Teste automacao{enter}').wait(200)
        cy.get('#name').type(mass.name).wait(200)
        cy.get('#cpf').type(mass.cpf).wait(200)
        cy.get('#rg').type(mass.rg).wait(200)
        cy.get('#zip_code').type(mass.adress.zipCode).wait(1000)
        cy.get('#cellphone').type(phoneRamdom).wait(200)
        cy.get('#street_number').type(mass.adress.number).wait(200)
      
        //Nessa parte do codigo ele intercepta a requisição de POST da criacao e verifica se o status é 201
        cy.intercept('POST', '/helper').as('request')
        cy.get('.modal-footer > .btn-primary').click()
        cy.wait('@request')
        cy.get('@request').its('response.statusCode').should('eq', 201)
    }
    resgisterDriver(mass) {
        cy.get('#company_id').type('{downArrow}{enter}')
        cy.get('#group_name').type(mass.group).wait(200)
        cy.get('#name').type(mass.name).wait(200)
        cy.get('#cpf').type(mass.cpf).wait(200)
        cy.get('#rg').type(mass.rg).wait(200)
        cy.get('#license').type(mass.cnh).wait(200)
        cy.get('#cellphone').type(mass.phone).wait(200)
        cy.get('#zip_code').type(mass.adress.zipCode).wait(200)
        cy.get('#license_validity').type(mass.validity).wait(200)
        cy.get('#street_number').type(mass.adress.number).wait(500)
        cy.get('#email').type(randomEmail)
        cy.get('#region').type('{enter}').wait(100)
        //Nessa parte do codigo ele intercepta a requisição de POST da criacao e verifica se o status é 201
        cy.intercept('POST', '/driver').as('request')
        cy.get('[style="float: right;"] > .btn-primary').click()
        cy.wait('@request')
        cy.get('@request').its('response.statusCode').should('eq', 201)
    }
    registerVeiche(mass) {
        cy.get('#plate').type(plateRamdom).wait(100)
        cy.get('#capacity').type(mass.capacity).wait(100)
        cy.get('#company_id').type('{downArrow}{enter}').wait(100)
        cy.intercept('POST', '/vehicle').as('request')
        cy.get('.css-tlfecz-indicatorContainer').type('Teste automacao{enter}')
        //Nessa parte do codigo ele intercepta a requisição de POST da criacao e verifica se o status é 201
        cy.get('.modal-footer > .btn-primary').click({force: true})
        cy.wait('@request')
        cy.get('@request').its('response.statusCode').should('eq', 201)
    }
  
}
export default SignupPage;