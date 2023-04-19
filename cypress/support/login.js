Cypress.Commands.add('assertionLoginFailed', () => {
  cy.get('div[role="alert"]').should('be.visible');
});

Cypress.Commands.add('assertionLoginSucess', () => {
  cy.get('.sc-gZMcBi').should('be.visible');
});

Cypress.Commands.add(
  'gui_login',
  (user = 'mylycy.carvalho@t10.digital', password = 'ad:MNYJy') => {
    cy.request('/').then((response) => { // Verifica se a página está disponível
      if (response.status === 200) {
        cy.visit('/').log('before executado corretamente')
      } else {
        cy.log('Página não disponível, verifique o servidor e a aplicação.');
        return;
      }
    });

    cy.get('.btn-xs').click();
    cy.get('#email').type(user);
    cy.get('#password').type(password, { log: false });
    cy.intercept('POST', 'https://singlesignonhom.web.app/auth').as('request');
    cy.get('.btn-primary').click();
    cy.wait('@request').then((interception) => {
      Cypress.env('token', interception.response.body.data.token);
      cy.wrap(interception.response.statusCode).should('eq', 200);
    });
    //cy.assertionLoginSucess();
  }
);

Cypress.Commands.add(
  'sessionLogin',
  (user = 'mylycy.carvalho@t10.digital', password = 'ad:MNYJy') => {
    const login = () => cy.gui_login(user, password);
    const validate = () => {
      cy.visit('/');
      cy.location('pathname', { timeout: 10000 }).should('not.eq', '/login?continue=/'); // Aumenta o tempo limite para 10 segundos
    };

    const options = {
      validate,
    };

    cy.session(user, login, options);
  }
);













Cypress.config('defaultCommandTimeout', 15000); // Aumenta o tempo limite global para 10 segundos
Cypress.config('retries', 3); // Adiciona retentativas para os comandos