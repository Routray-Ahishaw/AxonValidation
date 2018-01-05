const expect = require('chai').expect;
module.exports = function () {  

      //Open Home page and Login
       this.Given(/^I open the site "([^"]*)"$/, function (arg1) {
           return helpers.loadPage(arg1)
          .then( () => {
            return page.ProcessValidateActions.clickLogin("Login")      
          })
       });

       this.Given(/^login by giving valid username and password$/, function () {
          return page.ProcessValidateActions.getLoginDetails()
       });

       this.Then(/^I should see "([^"]*)" as the username$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.xpath('//span [contains(text(),"John Admin")]')), 30000)
            .then(() => {
             driver.findElement(By.xpath('//span [contains(text(),"John Admin")]')).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql(arg1)
                }catch(e){return Promise.reject(false)}
              })
            })
       });

       //Create a new process with mandatory fields
       this.When(/^I click on "([^"]*)", move to "([^"]*)" and select the "([^"]*)" option$/, function (arg1, arg2, arg3) {
          return driver.wait(until.elementsLocated(By.linkText("Create")), 80000)
          .then(()=>{
            page.ProcessValidateActions.clickCreate()
            return driver.wait(until.elementsLocated(By.linkText("Business & Change")), 90000)
            .then(()=>{
             return page.ProcessValidateActions.clickProcess()
            })
          })
       });

       this.Then(/^I see "([^"]*)" tab, Fill details, Save it$/, function (arg1) {
           return driver.wait(until.elementsLocated(By.id("field-new-title")),80000)
           .then(()=>{
            driver.findElement(By.id("field-new-title")).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql("New Process")
                }catch(e){return Promise.reject(false)}
              })
           })
         //fill details & click on 'Save & Close' button 
           .then(()=>{
            return page.ProcessValidateActions.fillDetails()
           })
       });


       this.Then(/^then I get the "([^"]*)" option for the New Process$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.linkText("Edit")),80000)
            .then(()=>{
            driver.findElement(By.linkText("Edit")).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql(arg1)
                }catch(e){return Promise.reject(false)}
              })
            })
       });

       //Create a new Process, specifying only the timeperiod for Duration
       this.When(/^I go to page "([^"]*)"$/, function (arg1) {
          return helpers.loadPage(arg1)
       });

       this.Then(/^provide manadatory inputs with Duration as "([^"]*)"$/, function (arg1) {
          return page.ProcessValidateActions.fillWithTP(arg1)
          return driver.wait(until.elementsLocated(By.linkText("Edit")),80000)
            .then(()=>{
              return driver.findElement(By.linkText("Edit")).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql("Edit")
                }catch(e){return Promise.reject(false)}
              })
            })
       });

        this.Then(/^I get the new process created with "([^"]*)" in 'Duration'$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.xpath('//*[@id="tab-process-summary"]/div[1]/div[1]/div[1]/div[3]/div/div[6]/div/div')),80000)
            .then(()=>{
            driver.findElement(By.xpath('//*[@id="tab-process-summary"]/div[1]/div[1]/div[1]/div[3]/div/div[6]/div/div')).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql("20")
                }catch(e){return Promise.reject(false)}
              })
            })
        });

      //Create a new Process, specifying only the Hours/Days for Duration
        this.When(/^I go to link "([^"]*)"$/, function (arg1) {
          return helpers.loadPage(arg1)
        });

         this.Then(/^provide manadatory inputs, select only Hours\/Days as Duration$/, function () {
            return page.ProcessValidateActions.fillWithTValue()
            return driver.wait(until.elementsLocated(By.linkText("Edit")),80000)
             .then(()=>{
             driver.findElement(By.linkText("Edit")).getText()
             .then(t => {
                  try {
                  expect(t).to.be.eql("Edit")
                 }catch(e){return Promise.reject(false)}
               })
             })
         });

        this.Then(/^I get the Process saved with "([^"]*)" text in 'Duration'$/, function (arg1) {
            return driver.wait(until.elementsLocated(By.xpath('//*[@id="tab-process-summary"]/div[1]/div[1]/div[1]/div[3]/div/div[6]/div/div')),80000)
            .then(()=>{
            driver.findElement(By.xpath('//*[@id="tab-process-summary"]/div[1]/div[1]/div[1]/div[3]/div/div[6]/div/div')).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql("Not specified")
                }catch(e){return Promise.reject(false)}
              })
            })
        });      

      //Trying to Create a new Process, without specifying certain mandatory field
        this.When(/^I visit the page "([^"]*)"$/, function (arg1) {
            return helpers.loadPage(arg1)
        });

        this.Then(/^I provide inputs, missing the "([^"]*)" field$/, function (arg1) {
            return page.ProcessValidateActions.fillWithNoName()
        });

        this.Then(/^I get the alert message$/, function () {
             try{
                  return driver.wait(until.elementsLocated(By.xpath('//*[@id="edit-messages"]/div')),8000)
                  return true;
                }catch(e){return false;}
        });

        this.Then(/^I should see "([^"]*)"$/, function (arg1, callback) {
         // Write code here that turns the phrase above into concrete actions
           return false;
       });
}


/*  Scenario: Create a new process with mandatory fields
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

*/