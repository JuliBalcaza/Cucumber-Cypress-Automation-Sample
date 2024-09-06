// Custom command to exchange authorization code for tokens (Authorization Code Grant)
Cypress.Commands.add('performAuthorizationCodeGrant', (authorizationCode) => {
    const loginConfig = Cypress.env('loginConfigs').authorizationCodeGrant;
  
    if (!authorizationCode) {
      throw new Error('Authorization code is required for token exchange.');
    }
  
    // POST request to exchange authorization code for tokens
    return cy.request({
      method: 'POST',
      url: loginConfig.token_url,
      form: true,
      body: {
        grant_type: loginConfig.grant_type,
        code: authorizationCode,
        redirect_uri: loginConfig.redirect_uri,
        client_id: loginConfig.client_id,
        client_secret: loginConfig.client_secret
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(`Token exchange failed with status: ${response.status}`);
      }
      expect(response.body).to.have.property('access_token');
      expect(response.body).to.have.property('id_token');
      cy.wrap(response.body.access_token).as('accessToken');
      cy.wrap(response.body.id_token).as('idToken');
    });
  });
  
  // Custom command to obtain the initial ID token using service account credentials
  Cypress.Commands.add('getIdToken', () => {
    const apiConfig = Cypress.env('loginConfigs').APIserviceAccount;
  
    return cy.request({
      method: 'POST',
      url: `${apiConfig.auth_url}/oauth2/v1/token`,
      headers: {
        'Content-Type': apiConfig.content_type,
        'Cookie': apiConfig.cookie
      },
      form: true,
      body: {
        username: apiConfig.username,
        client_id: apiConfig.client_id,
        password: apiConfig.password,
        connection: apiConfig.connection,
        grant_type: apiConfig.grant_type_step1,
        scope: apiConfig.scope_step1
      }
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(`Failed to get ID token with status: ${response.status}`);
      }
      expect(response.body).to.have.property('id_token');
      expect(response.body).to.have.property('access_token');
      cy.wrap(response.body.id_token).as('idTokenAssertion');
      cy.wrap(response.body.access_token).as('accessToken');
    });
  });
  
  // Custom command to exchange ID token and access token for JWT (Bearer token)
  Cypress.Commands.add('getJwtToken', () => {
    const apiConfig = Cypress.env('loginConfigs').APIserviceAccount;
  
    cy.get('@idTokenAssertion').then((idTokenAssertion) => {
      cy.get('@accessToken').then((accessToken) => {
        return cy.request({
          method: 'POST',
          url: `${apiConfig.auth_url}/oauth2/v1/token`,
          headers: {
            'Content-Type': apiConfig.content_type,
            'Cookie': apiConfig.cookie
          },
          form: true,
          body: {
            scope: apiConfig.scope_step2,
            grant_type: apiConfig.grant_type_step2,
            connection: apiConfig.connection,
            client_id: apiConfig.client_id,
            assertion: idTokenAssertion,
            access_token: accessToken
          }
        }).then((response) => {
          if (response.status !== 200) {
            throw new Error(`Failed to get JWT token with status: ${response.status}`);
          }
          expect(response.body).to.have.property('access_token');
          cy.wrap(response.body.access_token).as('bearerToken');
        });
      });
    });
  });
  