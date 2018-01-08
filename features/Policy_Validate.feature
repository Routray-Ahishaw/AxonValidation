#Policy_Validate.feature
Feature: Create a policy and validate its view
I should be able to login the axon website
And create a new policy

Background:
        Given I open the site "http://ms-axon-development.local:8888/"
        And login by giving valid username and password
        Then I should see "John Admin" as the username
    	
	Scenario: Create a new policy with mandatory fields  
    
    When I click on "Create", move to "Business & Change" and select the "Policy" option
    Then I see "New Policy" tab, Fill details, click on "Save & Close"
    And then I get the "Edit" option for the New Policy

    Scenario: Trying to Create a new Policy, without specifying certain mandatory field  
    
    When I visit the page "http://ms-axon-development.local:8888/policy/new"
    Then I provide inputs, missing the "Name" field
    Then I get the alert message

    Scenario: View the items in the Policy list and the chart in the Dashboard
    
    When I visit the url "http://ms-axon-development.local:8888/search/"
    Then to search the "Policy" facet, I clicked on '+'
    Then move to "Business & Change", There select the Policy checkbox 
    
    And I clicked on "Policy" option
    Then I get the grid having list of Policy
    
    When I select the "Dashboard" 
    Then I get the Lifecycle chart  

    Scenario: View the details of a "FACTA" system
    
    When I go to url "http://ms-axon-development.local:8888/policy/view/id/1"
    Then I get its summary with the "Edit" button
   
    When I select the "Components" option
    Then I get the Policy Hierarchy
   
    When I select "Stakeholders" 
    Then I do get the "Direct Stakeholder" and the "Stakeholder Community" grids
   
    When I click on "Impact" option 
    Then I get the list of "Product" having this Policy

    When I click on "Data"
    Then I get list of "Data Quality Rules" and "Data Attributes" 
