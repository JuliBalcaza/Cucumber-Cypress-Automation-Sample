import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../pages/login-page';
import { urls } from '../../support/helpers';

const loginPage = new LoginPage();
const loginConfig = Cypress.env('loginConfigs').authorizationCodeGrant;

Given('I clear cookies and local storage', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

When('I visit the login page', () => {
  const state = Cypress._.random(0, 1e6).toString();
  const authorizationUrl = `${loginConfig.auth_url}?client_id=${loginConfig.client_id}&response_type=code&scope=${encodeURIComponent(loginConfig.scope)}&redirect_uri=${encodeURIComponent(loginConfig.redirect_uri)}&state=${state}`;
  loginPage.visit(authorizationUrl);
});

When('I enter valid credentials', () => {
  loginPage.enterUsername(loginConfig.validStgUser);
  loginPage.enterPassword(loginConfig.validStgPassword);
});

When('I enter invalid credentials', () => {
  loginPage.enterUsername(loginConfig.invalidStgUser);
  loginPage.enterPassword(loginConfig.invalidStgPassword);
});

When('I submit the login form', () => {
  loginPage.submit();
});

Then('I should see the access denied page', () => {
  cy.origin(urls.redirectLoginUrl, () => {
    cy.url().should('include', '/access_denied/access_denied.gsp');
  });
});

Then('I should be redirected to the home page after clicking the button', () => {
  cy.origin(urls.redirectLoginUrl, () => {
    cy.get('a.btn[href="/auth0/login?returnTo=/site/global/home/index.gsp"]').click({force: true});
    cy.url().should('include', '/home/index.gsp');
    cy.get('img[src="/images/user.svg"]').should('exist');
  });
});

Then('I should see an error message for invalid login', () => {
  cy.get('div.errors.note.note--error[data-token="weUnblUsrPassCmb"]')
    .should('be.visible')
    .and('contain.text', 'The login details entered are incorrect.');
});

When('I click on the Forgot your Password link', () => {
  loginPage.passReset();
});

Then('I should be redirected to the password assistance page', () => {
  cy.origin(urls.passwordAssistanceUrl, () => {
    cy.url().should('include', 'pswdAssistance');
  });
});
