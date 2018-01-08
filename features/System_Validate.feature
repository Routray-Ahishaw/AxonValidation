#System.feature
Feature: Create a system and validate its view
I should be able to login the axon website
And create a new process

    Background:
        Given I open the site "http://ms-axon-development.local:8888/"
        And login by giving valid username and password
        Then I should see "John Admin" as the username


    Scenario: Create a new process with mandatory fields
    When I click on "Create", move to "Data & Technology" and select the "System" option
    Then I see "New System" tab, Fill details, Save it
    And then I get the "Edit" option for the New System

    Scenario: Trying to Create a new System, without specifying certain mandatory field  
    When I visit the page "http://ms-axon-development.local:8888/system/new"
    Then I provide inputs, missing the "Short Name" field
    Then I get the alert message
    
    Scenario: View the list of Systems and the chart in the Dashboard
    When I visit the url "http://ms-axon-development.local:8888/search/"
    Then I search for "System" facet, and click on it
    Then I get the grid having list of systems
    When I select the "Dashboard" 
    Then I get the Lifecycle chart 
   
   
    Scenario: View the details of a "CMD" system
    When I go to url "http://ms-axon-development.local:8888/system/view/id/1"
    Then I get its summary with the "Edit" button
   
    When I select the "Interfaces" option
    Then I get the list of "System Interfaces" and "Data Flow Outside the Interface"
   
    When I select "Stakeholders" 
    Then I do get the "Direct Stakeholders" and the "Stakeholder Community" grids
   
    When I click on "Impact" option 
    Then I get the "Product" having this System