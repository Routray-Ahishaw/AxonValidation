#Search.feature
Feature: Login Validation for axon app
    I should be able to go to a website
    and check its login functionality

  	Background:
        Given I open the site "http://ms-axon-development.local:8888/"

    Scenario: Login with valid credentials
        When I enter "admin@informatica.com" as username and "changeme" as password
        Then I should see "John Admin" as the username

    Scenario: Login with invalid credentials
        When I enter "admin" as wrong username and "changeme" as password
        Then I should see "Bad credentials." in the alert box

    Scenario: Login with valid username but no password
       When I enter "admin" as username and keep password as blank
       Then I should see "Bad credentials." as warning

    Scenario: Login with blank username but a password
       When I enter "admin" as password and keep username as blank
       Then I should see "Bad credentials." in alert box

    