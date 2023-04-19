// Função para obter a data de amanhã no formato aaaa-mm-dd
function getDateTomorrow() {
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const day = String(tomorrow.getDate()).padStart(2, '0');
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const year = tomorrow.getFullYear();
  return `${year}-${month}-${day}`;
}

const currentDate = new Date();
const formattedCurrentDate = currentDate.toISOString().slice(0, 10);
const dateTomorrow = getDateTomorrow();

// Comando para criar uma entrega fresh
Cypress.Commands.add('createFreshStress', () => {
  cy.api({
    method: 'POST',
    url: 'https://logistic.api.kdabraqa.com/delivery',
    headers: {
      'x-api-token': `${Cypress.env('token')}`,
      'Content-Type': 'application/json',
      'Request-Origin': 'logistc'
    },
    body: {
      "name": "Diego",
      "street": "Avenida Paulista, 2100 Banco Safra S.A.",
      "street_number": "2100",
      "neighborhood": "Bela Vista",
      "city": "São Paulo",
      "state": "SP",
      "zip_code": "01310-930",
      "complement": null,
      "general_restriction": null,
      "hour_restriction_start": "08:30",
      "hour_restriction_end": "18:00",
      "status": "OK",
      "delivery_number": 1,
      "total_value": 0,
      "sku_total": 0,
      "volume_total": 0,
      "number_of_volumes": 0,
      "delivery_type": "B2B",
      "store_id": 2,
      "cluster_id": 1,
      "delivery_date": dateTomorrow + "T03:00:00.000Z", 
      "original_delivery_date": null,
      "client_id": null,
      "payment_method": null,
      "manual": true
    }
  }).then((response) => {
    Cypress.env('pointFreshStress', response.body.id)
    Cypress.env('orderFreshStress', response.body.code)
    expect(response.status).to.eq(201)
  })
})

// Comando para criar uma entrega mensal
Cypress.Commands.add('createMensalStress', () => {
  cy.api({
    method: 'POST',
    url: 'https://logistic.api.kdabraqa.com/delivery',
    headers: {
      'x-api-token': `${Cypress.env('token')}`,
      'Content-Type': 'application/json',
      'Request-Origin': 'logistc'
    },
    body:
    {
      "name": "Diego",
      "street": "Avenida Paulista, 2100 Banco Safra S.A.",
      "street_number": "2100",
      "neighborhood": "Bela Vista",
      "city": "São Paulo",
      "state": "SP",
      "zip_code": "01310-930",
      "complement": null,
      "general_restriction": null,
      "hour_restriction_start": "08:30",
      "hour_restriction_end": "18:00",
      "status": "OK",
      "delivery_number": 1,
      "total_value": 0,
      "sku_total": 0,
      "volume_total": 0,
      "number_of_volumes": 0,
      "delivery_type": "B2B",
      "store_id": 1,
      "cluster_id": 1,
      "delivery_date": formattedCurrentDate + "T03:00:00.000Z",
      "original_delivery_date": null,
      "client_id": null,
      "payment_method": null,
      "manual": true
    }
  }).then((response) => {
    Cypress.env('pointMensalStress', response.body.id)
    Cypress.env('orderMensaStress', response.body.code)
    expect(response.status).to.eq(201)
  })
})

Cypress.Commands.add('createRouteStress', () => {
  const min = 10;
  const max = 700;
  const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
  Cypress.env('number',numeroAleatorio)
  cy.api({
    method: 'POST',
    url: 'https://logistic.api.kdabraqa.com/router/' + dateTomorrow,
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
        a: {
          "id": `${Cypress.env('pointMensalStress')}`,
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
            "order_ext_id": `${Cypress.env('pointMensalStress')}`,
            "order_code": `${Cypress.env('orderMensaStress')}`,
            "number_of_volumes": 0,
            "fiscal_document": "",
            "delivery_number": 1
          },
          "key": "B"
        },
        b: {
          "id": `${Cypress.env('pointFreshStress')}`,
          "distance_to_arrive": 0,
          "first": false,
          "last": false,
          "latitude": -23.5109773,
          "longitude": -46.8849432,
          "time_to_arrive": 0,
          "sequence": 2,
          "calculated_time_to_arrive": "11:36",
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
            "order_code": `${Cypress.env('orderFreshStress')}`,
            "number_of_volumes": 0,
            "fiscal_document": "",
            "delivery_number": 1
          },
          "key": "C"
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
          "distance_to_arrive": 19862,
          "first": false,
          "last": true,
          "latitude": -23.5190728,
          "longitude": -46.766443,
          "time_to_arrive": 1312,
          "sequence": 3,
          "calculated_time_to_arrive": "00:21",
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
          "key": "D"
        }
      },
      "total_distance": 36820,
      "number_of_deliveries": 2,
      "amount_of_money": 0,
      "total_time": 2626,
      "driver_id": 3,
      "order": 0,
      "sequence": `${Cypress.env('number')}`,
      "truck": `${Cypress.env('number')}`,
      "wave": "A",
      "continuation": false,
      "wave_gap": 19
    }

  }).then((response) => {
    Cypress.env('idRoute', response.body.id)
    expect(response.status).to.eq(200)
  })
})
