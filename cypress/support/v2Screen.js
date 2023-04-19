// Define a data atual e outras variáveis relacionadas à data
const currentDate = new Date();
const formattedCurrentDate = currentDate.toISOString().slice(0, 10);
const dateWithoutTime = new Date(formattedCurrentDate + 'T00:00:00');
var timestamp = Math.floor(dateWithoutTime.getTime() / 1000);
timestamp = timestamp + "000";

// Copia os pedidos e verifica se o alerta de sucesso é exibido
Cypress.Commands.add('copyOrders', () => {
  cy.get('.sc-hmXxxW').eq(3).click();
  cy.get('[role="alert"]').should('be.visible');
});

// Navega até a roteirização V2 e verifica se o título está correto
Cypress.Commands.add('clickV2', () => {
  cy.visit('/');
  cy.get('a[class="sc-gqjmRU jJvShe card bg-color6"]').eq(1).click();
  cy.get('.sc-frDJqD').click();
  cy.get('.sc-frDJqD').type('{downarrow}{leftarrow}{leftarrow}{leftarrow}{enter}');
  cy.get('h3').should('have.text', 'Roteirização V2');
});

// Gera um número de rota e verifica se a mensagem de sucesso é exibida
Cypress.Commands.add('generateNumberRoute', () => {
  cy.visit('/roteirizacao-v2');
  cy.get('.sc-frDJqD').type('{enter}');
  cy.get('.sc-cqCuEk > .fa').click();
  cy.contains('Números de rota atualizados!').should('be.visible');
});

// Verifica se as lojas estão corretamente configuradas
Cypress.Commands.add('verifyStore', () => {
  cy.get('.css-xs088g').type('{enter}');
  cy.get('.css-mcvprr').first().type('{enter}');
  cy.get(':nth-child(1) > .css-b62m3t-container > .css-5idz8h').first().type('{enter}');
  cy.get(':nth-child(1) > .css-b62m3t-container > .css-5idz8h').first().type('{enter}');
  cy.get('[aria-label="Remove Fresh"]').should('be.visible');
  cy.get('[aria-label="Remove Mini Mercado"]').should('be.visible');
  cy.get('[aria-label="Remove Pontual"]').should('be.visible');
  cy.get('[aria-label="Remove Mensal"]').should('be.visible');
  cy.get('[aria-label="Remove Pontual"]').should('be.visible');
});

// Interage com o calendário e aguarda 3 segundos
Cypress.Commands.add('calender', () => {
  cy.get('.sc-frDJqD').click();
  cy.get('.sc-frDJqD').type('{downarrow}{leftarrow}{leftarrow}{leftarrow}{enter}');
  cy.wait(3000);
});

// Cria uma nova rota sem pedidos e verifica se os elementos corretos estão visíveis
Cypress.Commands.add('orderNoRequest', () => {
  cy.contains('Criar nova rota').click();
  cy.get('[style="writing-mode: vertical-rl; color: white;"]').click();
  cy.get('.sc-bMvGRv').eq(0).click();
  cy.get('.sc-bMvGRv').eq(1).click();
  cy.get('#time').type(1000)
  cy.get('.css-1891t9v').wait(1000).type('{enter}')
  cy.contains(`Adicionar pedidos`).click()
  cy.contains(`2 pedidos selecionados`).should('be.visible')
  cy.contains(`00:00`).should('be.visible')
})

Cypress.Commands.add('updateRoute', () => {
  cy.wait(2000)
  cy.contains(`Atualizar previsão`).click()
  cy.contains(`11:21`).should('be.visible')
  cy.contains(`11:36`).should('be.visible')
})
Cypress.Commands.add('salveRoute', () => {
  cy.contains(`Salvar rota`).click()
  cy.contains('Rota criada com sucesso!').should('be.visible')
  cy.contains(`Você deseja adicionar uma nova leva?`).should('be.visible')
})
Cypress.Commands.add('lockOrder', () => {
  cy.get('.sc-cHSUfg').first().click()
  cy.get('[class="sc-iYUSvU jaqazN"]').should('be.disabled')
  cy.wait(2000)
  cy.contains(`Atualizar previsão`).click()
  cy.get('[class="sc-iYUSvU jaqazN"]').should('be.disabled')
})





Cypress.Commands.add('registerOrder', (
  typeStore = undefined,
  name = "Automacao Logistics",
  street = "rua teste automacao",
  number = "1032",
  neighborhood = "automcao logistics",
  zipCode = "06401015",
) => {

  cy.get('i.fa.fa-fw.fa-plus').click();
  cy.get('#store_id').select(typeStore);
  cy.get('#name').type(name);
  cy.get('#street').type(street);
  cy.get('#street_number').type(number);
  cy.get('#neighborhood').type(neighborhood);
  cy.get('#zip_code').type(zipCode);
  cy.intercept('POST', '/delivery').as('request');
  cy.contains(`button`, `Salvar`).click();
  cy.get('div[role="alert"]').should('have.text', 'Pedido criado com sucesso');
  cy.wait('@request').then((interception) => {
    Cypress.env('point', interception.response.body.id)
    Cypress.env('order', interception.response.body.code);
    cy.wrap(interception.response.statusCode).should('eq', 201);
  })
});

Cypress.Commands.add('createRoute', () => {
  const min = 10;
  const max = 700;
  const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
  Cypress.env('number', numeroAleatorio)
  cy.api({
    method: 'POST',
    url: 'https://logistic.api.kdabraqa.com/router/' + formattedCurrentDate,
    headers: {
      'x-api-token': `${Cypress.env('token')}`,
      'Content-Type': 'application/json',
      'Request-Origin': 'logistc'
    },
    body:
    {
      "id": null,
      "store": "mensal",
      "store_id": 1,
      "cluster_id": 1,
      "dirty": false,
      "first": false,
      "last": false,
      "load_time": "10:00",
      "points": {
        c: {
          "id": `${Cypress.env('pointMensal')}`,
          "distance_to_arrive": 16958,
          "first": false,
          "last": false,
          "latitude": -23.5109773,
          "longitude": -46.8849432,
          "time_to_arrive": 1314,
          "sequence": 1,
          "calculated_time_to_arrive": "11:21",
          "order": {
            "customer_ext_id": null,
            "customer_name": "Automacao L.",
            "customer_address": {
              "street": "rua teste automacao",
              "street_number": "1032",
              "neighborhood": "automcao logistics",
              "city": "São Paulo",
              "state": "SP",
              "zip_code": "06401-015",
              "complement": null,
              "hour_restriction": {
                "start": "1970-01-01 08:30:00.000-03:00",
                "end": "1970-01-01 18:00:00.000-03:00"
              },
              "general_restriction": null
            },
            "order_ext_id": `${Cypress.env('pointMensal')}`,
            "order_code": `${Cypress.env('orderMensal')}`,
            "number_of_volumes": 0,
            "fiscal_document": "",
            "delivery_number": 1
          },
          "key": "B"
        },
        d: {
          "id": `${Cypress.env('pointFresh')}`,
          "distance_to_arrive": 3466,
          "first": false,
          "last": false,
          "latitude": -23.513285,
          "longitude": -46.8887002,
          "time_to_arrive": 306,
          "sequence": 2,
          "calculated_time_to_arrive": "11:42",
          "order": {
            "customer_ext_id": null,
            "customer_name": "Automacao L.",
            "customer_address": {
              "street": "rua teste automacao",
              "street_number": "1032",
              "neighborhood": "automcao logistics",
              "city": "São Paulo",
              "state": "SP",
              "zip_code": "06401-015",
              "complement": null,
              "hour_restriction": {
                "start": "1970-01-01 08:30:00.000-03:00",
                "end": "1970-01-01 18:00:00.000-03:00"
              },
              "general_restriction": null
            },
            "order_ext_id": `${Cypress.env('pointFresh')}`,
            "order_code": `${Cypress.env('orderFresh')}`,
            "number_of_volumes": 0,
            "fiscal_document": "",
            "delivery_number": 1
          },
          "key": "C"
        },
        e: {
          "id": `${Cypress.env('pointPontual')}`,
          "distance_to_arrive": 0,
          "first": false,
          "last": false,
          "latitude": -23.5135736,
          "longitude": -46.886533,
          "time_to_arrive": 0,
          "sequence": 3,
          "calculated_time_to_arrive": "11:57",
          "order": {
            "customer_ext_id": null,
            "customer_name": "Automacao L.",
            "customer_address": {
              "street": "rua teste automacao",
              "street_number": "1032",
              "neighborhood": "automcao logistics",
              "city": "São Paulo",
              "state": "SP",
              "zip_code": "06401-015",
              "complement": null,
              "hour_restriction": {
                "start": "1970-01-01 08:30:00.000-03:00",
                "end": "1970-01-01 18:00:00.000-03:00"
              },
              "general_restriction": null
            },
            "order_ext_id": `${Cypress.env('pointPontual')}`,
            "order_code": `${Cypress.env('orderPontual')}`,
            "number_of_volumes": 0,
            "fiscal_document": "",
            "delivery_number": 1
          },
          "key": "D"
        },
        f: {
          "id": `${Cypress.env('pointMiniMercado')}`,
          "distance_to_arrive": 0,
          "first": false,
          "last": false,
          "latitude": -23.5135736,
          "longitude": -46.886533,
          "time_to_arrive": 0,
          "sequence": 4,
          "calculated_time_to_arrive": "12:12",
          "order": {
            "customer_ext_id": null,
            "customer_name": "Automacao L.",
            "customer_address": {
              "street": "rua teste automacao",
              "street_number": "1032",
              "neighborhood": "automcao logistics",
              "city": "São Paulo",
              "state": "SP",
              "zip_code": "06401-015",
              "complement": null,
              "hour_restriction": {
                "start": "1970-01-01 08:30:00.000-03:00",
                "end": "1970-01-01 18:00:00.000-03:00"
              },
              "general_restriction": null
            },
            "order_ext_id": `${Cypress.env('pointMiniMercado')}`,
            "order_code": `${Cypress.env('orderMiniMercado')}`,
            "number_of_volumes": 0,
            "fiscal_document": "",
            "delivery_number": 1
          },
          "key": "E"
        },
        g: {
          "id": `${Cypress.env('pointExpressa')}`,
          "distance_to_arrive": 0,
          "first": false,
          "last": false,
          "latitude": -23.5135736,
          "longitude": -46.886533,
          "time_to_arrive": 0,
          "sequence": 5,
          "calculated_time_to_arrive": "12:27",
          "order": {
            "customer_ext_id": null,
            "customer_name": "Automacao L.",
            "customer_address": {
              "street": "rua teste automacao",
              "street_number": "1032",
              "neighborhood": "automcao logistics",
              "city": "São Paulo",
              "state": "SP",
              "zip_code": "06401-015",
              "complement": null,
              "hour_restriction": {
                "start": "1970-01-01 08:30:00.000-03:00",
                "end": "1970-01-01 18:00:00.000-03:00"
              },
              "general_restriction": null
            },
            "order_ext_id": `${Cypress.env('pointExpressa')}`,
            "order_code": `${Cypress.env('orderExpressa')}`,
            "number_of_volumes": 0,
            "fiscal_document": "",
            "delivery_number": 1
          },
          "key": "F"
        },
        "-1": {
          "id": {},
          "distance_to_arrive": 0,
          "first": true,
          "last": false,
          "latitude": -23.5190728,
          "longitude": -46.766443,
          "time_to_arrive": 0,
          "sequence": 0,
          "calculated_time_to_arrive": "00:00",
          "order": {
            "customer_ext_id": 0,
            "customer_name": "FC1",
            "customer_address": {
              "street": "Avenida Presidente Kenedy",
              "street_number": 2299,
              "neighborhood": "Vila dos Remedios",
              "city": "Osasco",
              "state": "SP",
              "zip_code": "06298-190",
              "complement": null,
              "hour_restriction": null,
              "general_restriction": null
            },
            "order_ext_id": -1,
            "order_code": "",
            "number_of_volumes": 0,
            "fiscal_document": "",
            "delivery_number": 0
          },
          "key": "A"
        },
        "-91": {
          "id": {},
          "distance_to_arrive": 20458,
          "first": false,
          "last": true,
          "latitude": -23.5190728,
          "longitude": -46.766443,
          "time_to_arrive": 1356,
          "sequence": 6,
          "calculated_time_to_arrive": "00:22",
          "order": {
            "customer_ext_id": 0,
            "customer_name": "FC1",
            "customer_address": {
              "street": "Avenida Presidente Kenedy",
              "street_number": 2299,
              "neighborhood": "Vila dos Remedios",
              "city": "Osasco",
              "state": "SP",
              "zip_code": "06298-190",
              "complement": null,
              "hour_restriction": null,
              "general_restriction": null
            },
            "order_ext_id": -91,
            "order_code": "",
            "number_of_volumes": 0,
            "fiscal_document": "",
            "delivery_number": 0
          },
          "key": "G"
        }
      },
      "total_distance": 40882,
      "number_of_deliveries": 5,
      "amount_of_money": 0,
      "total_time": 2976,
      "driver_id": 347,
      "order": 0,
      "sequence": `${Cypress.env('number')}`,
      "truck": `${Cypress.env('number')}`,
      "wave": "A",
      "continuation": false,
      "wave_gap": 14
    }

  }).then((response) => {
    expect(response.status).to.eq(200)
    Cypress.env('idRoute', response.body.id)
  })
})