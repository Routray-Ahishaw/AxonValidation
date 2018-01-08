#System.feature
Feature: Create a system and validate its view
I should be able to login the axon website
And create a new process

    Background:
        Given I open the site "http://ms-axon-development.local:8888/"
        And login by giving valid username and password
        Then I should see "John Admin" as the username

   
    Scenario: View the details of a "CMD" system
    When I go to url "http://ms-axon-development.local:8888/system/view/id/1"
    Then I get its summary with the "Edit" button
   
    When I select the "Interfaces" option
    Then I get the list of "System Interfaces" and "Data Flow Outside the Interface"
   
    When I select "Stakeholders" 
    Then I do get the "Direct Stakeholders" and the "Stakeholder Community" grids
   
    When I click on "Impact" option 
    Then I get the "Product" having this System