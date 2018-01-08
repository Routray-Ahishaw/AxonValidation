#Glossary_Validate.feature
Feature: Create a glossary and validate its view
I should be able to login the axon website
And create a new glossary

Background:
        Given I open the site "http://ms-axon-development.local:8888/"
        And login by giving valid username and password
        Then I should see "John Admin" as the username
    
    Scenario: Create a new glossary with mandatory fields  
    When I click on "Create", move to "Data & Technology" and select the "Glossary" option
    Then I see "New Glossary" tab, Fill details, click on "Save & Close"
    And then I get the "Edit" option for the New Glossary

    Scenario: Trying to Create a new glossary, without specifying certain mandatory field  
    When I visit the page "http://ms-axon-development.local:8888/glossary/new"
    Then I provide inputs, missing the "Name" field
    Then I get the alert message

   	Scenario: View the items in the Glossary list and the chart in the Dashboard
    When I visit the url "http://ms-axon-development.local:8888/search/"
    Then I search for "Glossary" facet, and click on it
    Then I get the grid having list of glossary
    When I select the "Dashboard" 
    Then I get the Lifecycle chart  
    
    Scenario: View the details of a particular glossary
    When I go to url "http://ms-axon-development.local:8888/search/" and select the "Glossary" facet
    Then I get the gossary list, from there I select "Party Data"
    And I get its summary with the "Edit" button
    When I select the "Relationships" option
    Then I get the "Glossary Hirarchy" text as the heading of the grid
    When I select "Stakeholders" 
    Then I do get the "Direct Stakeholders" and the "Stakeholder Community" grids
    When I click on "Impact" option 
    Then I get the name of the product, in which this Glossary item is present
    When I click on "Data"
    Then I get the "Data Instances" and the "Data Attribute Instances" 


    

