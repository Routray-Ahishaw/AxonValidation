#Process.feature
Feature: Create a process and validate its view
I should be able to login the axon website
And create a new process

    Background:
        Given I open the site "http://ms-axon-development.local:8888/"
        And login by giving valid username and password
        Then I should see "John Admin" as the username


    Scenario: Create a new process with mandatory fields

    When I click on "Create", move to "Business & change" and select the "Process" option
    Then I see "New Process" tab, Fill details, Save it
    And then I get the "Edit" option for the New Process
    
    Scenario: Create a new Process, specifying only the timeperiod for Duration
    
    When I go to page "http://ms-axon-development.local:8888/process/new"
    Then provide manadatory inputs with Duration as "20" 
    Then I get the new process created with "20" in 'Duration' 

    Scenario: Create a new Process, specifying only the Hours/Days for Duration
    
    When I go to link "http://ms-axon-development.local:8888/process/new"
    Then provide manadatory inputs, select only Hours/Days as Duration
    Then I get the Process saved with "Not Specified" text in 'Duration' 

    Scenario: Trying to Create a new Process, without specifying certain mandatory field
    
    When I visit the page "http://ms-axon-development.local:8888/process/new"
    Then I provide inputs, missing the "Name" field
    Then I get the alert message

    Scenario: Verifying Admin User name after login
    
    Then I should see "Welcome to Google"
