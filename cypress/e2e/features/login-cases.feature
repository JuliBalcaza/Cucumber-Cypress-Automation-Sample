Feature: Login Scenarios

  Background:
    Given I clear cookies and local storage

  Scenario: Handle access denied page and complete login
    When I visit the login page
    And I enter valid credentials
    And I submit the login form
    Then I should see the access denied page
    And I should be redirected to the home page after clicking the button

  Scenario: Show an error message with invalid credentials
    When I visit the login page
    And I enter invalid credentials
    And I submit the login form
    Then I should see an error message for invalid login

  Scenario: Redirect to password assistance page when clicking on Forgot Password
    When I visit the login page
    And I click on the Forgot your Password link
    Then I should be redirected to the password assistance page
