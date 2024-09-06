class LoginPage {
  visit(url) {
    cy.visit(url,  { failOnStatusCode: false });
  }

  enterUsername(username) {
    return cy.get('#email').type(username);
  }

  enterPassword(password) {
    return cy.get('#password').type(password);
  }

  submit() {
    return cy.get('button span[data-token="signIn"]').click();
  }

  loginButton() {
    return cy.get('a').contains('Log in').click();
  }

  loginTitle() {
    return cy.get('div').contains('Log in or Sign up');
  }

  loginIcon() {
    return cy.get('button[aria-label="Login menu"]');
  }

  passReset() {
    return cy.get('#passwdReset').invoke('removeAttr', 'target').click();
  }

  signInTitleSelector(){
    return cy.get('h2[token-title="signIn"][data-token="signIn"]');
  }

}

export default LoginPage;