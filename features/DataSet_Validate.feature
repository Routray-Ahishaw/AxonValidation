#DataSet_Validate.feature
Feature: Create a data set and validate its view
I should be able to login the axon website
And create a new data set

Background:
        Given I open the site "http://ms-axon-development.local:8888/"
        And login by giving valid username and password
        Then I should see "John Admin" as the username

    Scenario: Create a new data set with mandatory fields  
    When I click on "Create", move to "Data & Technology" and select the "Data Set" option
    Then I see "New Data Item" tab, Fill details, click on "Save & Close"
    And then I get the "Edit" option for the New Data Set

    Scenario: Trying to Create a new Data Set, without specifying certain mandatory field  
    When I visit the page "http://ms-axon-development.local:8888/data/new/systemId"
    Then I provide inputs, missing the "Name" field
    Then I get the alert message
    
    Scenario: View the items in the Data Set list and the chart in the Dashboard
    When I visit the url "http://ms-axon-development.local:8888/search/"
    Then I search for "Data Sets" facet, and click on it
    Then I get the grid having list of data sets
    When I select the "Dashboard" 
    Then I get the Lifecycle chart  

    Scenario: View the details of a "Legal Entity record" data set
    When I go to url "http://ms-axon-development.local:8888/data/view/id/1"
    Then I get its summary with the "Edit" button
   
    When I select the "Attributes" option
    Then I get the list of attributes structure
   
    When I select "Relationships" option
    Then I find the "Inbound Relationship" and the "Outbound Relationship"
   
    When I select "Stakeholders" 
    Then I do get the "Data Sets", "Data Attributes" and the "Stakeholder Community" grids
   
    When I click on "Data Quality" and then the "Rules"
    Then I get "Details" of all rules in form of grid 
   
    When I click on "Impact" option 
    Then I get the list of "Process" having this data set

    Scenario: View the items in the Attribute list and the chart in the Dashboard
    When I visit url "http://ms-axon-development.local:8888/search/"
    Then I go to "Attributes" facet, and click on it
    Then I get the grid having list of attributes
    When I select its "Dashboard" option
    Then I get the charts, where "Editability" chart is shown first   


    Scenario: View the related Data Set details when I click on a partiular Attribute like "CMD ID" 
    When I select "Attributes" after going to search url "http://ms-axon-development.local:8888/search/"
    Then I click on "CMD ID" from the Attribute list 
    Then I get the "Edit" option for its related Data Set Summary 


  	

    

