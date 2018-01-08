const expect = require('chai').expect;
module.exports = function () {  

//Open Home page and Login
       this.Given(/^I open the site "([^"]*)"$/, function (arg1) {
          return helpers.loadPage(arg1)
          .then( () => {
            return page.PolicyActions.clickElement("Login","linkText")      
          })
       });

       this.Given(/^login by giving valid username and password$/, function () {
          return page.PolicyActions.getLoginDetails()
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

//Create a new Policy with all mandatory fields and Save it
       this.When(/^I click on "([^"]*)", move to "([^"]*)" and select the "([^"]*)" option$/, function (arg1, arg2, arg3) {
         return driver.wait(until.elementsLocated(By.linkText("Create")), 80000)
          .then(()=>{
            page.PolicyActions.clickElement(arg1,"linkText")
            return driver.wait(until.elementsLocated(By.linkText("Business & Change")), 90000)
            .then(()=>{
             return page.PolicyActions.clickPolicy()
            })
          })
       });

       this.Then(/^I see "([^"]*)" tab, Fill details, click on "([^"]*)"$/, function (arg1, arg2) {
          return driver.wait(until.elementsLocated(By.id("field-new-title")),50000)
           .then(()=>{
            driver.findElement(By.id("field-new-title")).getText()
            .then(t => {
              console.log(t);
                 try {
                 expect(t).to.be.eql("New Policy")
                 }catch(e){return Promise.reject(false)}
                })
            })

           .then(()=>{
            return page.PolicyActions.fillDetails()
           })
       });

       this.Then(/^then I get the "([^"]*)" option for the New Policy$/, function (arg1) {
         return driver.wait(until.elementsLocated(By.className("btn btn-tools editLink")),80000)
            .then(()=>{
            driver.findElement(By.className("btn btn-tools editLink")).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql(arg1)
                }catch(e){return Promise.reject(false)}
              })
            })
       });

//Get alert box while trying to create new Policy without specifying mandatory field, 'Name'
        this.When(/^I visit the page "([^"]*)"$/, function (arg1) {
         return helpers.loadPage(arg1)
        });

        this.Then(/^I provide inputs, missing the "([^"]*)" field$/, function (arg1) {
         return driver.wait(until.elementsLocated(By.id("field-new-title")),50000)
           .then(()=>{
            driver.findElement(By.id("field-new-title")).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql("New Policy")
                 }catch(e){return Promise.reject(false)}
                })
            })

           .then(()=>{
            return page.PolicyActions.fillWithNoName()
           })
        });

        this.Then(/^I get the alert message$/, function () {
          return page.PolicyActions.checkByClassName("alert no-margin alert-danger")
        });

//Add 'policy' option to facets bar
        this.When(/^I visit the url "([^"]*)"$/, function (arg1) {
          return helpers.loadPage(arg1)
       });

       this.Then(/^to search the "([^"]*)" facet, I clicked on '\+'$/, function (arg1) {
            return driver.wait(until.elementsLocated(By.className("facet-selection")), 80000)
          .then(()=>{
            return driver.findElement(By.className("facet-selection")).click();
          })
       });

       this.Then(/^move to "([^"]*)", There select the Policy checkbox$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.linkText("Business & Change")), 90000)
          .then(()=>{
              return page.PolicyActions.viewPolicy()
          })
       });

//Get the list of Policy items when clicked on Policy
       this.Then(/^I clicked on "([^"]*)" option$/, function (arg1) {
          var path='//*[@id="navbar-tabs-toggle"]/ul/li[8]/a'
           return driver.wait(until.elementsLocated(By.xpath(path)),8000)
            .then(()=>{
              return page.PolicyActions.clickElement(path,"xpath")
            })
       });

       this.Then(/^I get the grid having list of Policy$/, function () {
          return page.PolicyActions.checkById("tab-unison-POLICY")
       });

//Get the charts when clicked on dashboard
       this.When(/^I select the "([^"]*)"$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.linkText("Dashboard")),8000)
            .then(()=>{
              return page.PolicyActions.clickElement("Dashboard","linkText")
            })
       });

       this.Then(/^I get the Lifecycle chart$/, function () {
          return page.PolicyActions.checkById("highcharts-0")
       });

//I get the Edit option and the summary when I go to FATCA policy view
       this.When(/^I go to url "([^"]*)"$/, function (arg1) {
         return helpers.loadPage(arg1)
       });

       this.Then(/^I get its summary with the "([^"]*)" button$/, function (arg1) {
         try {
              driver.wait(until.elementsLocated(By.linkText("Edit")),8000)
          }catch(e){return Promise.reject(false)} 
       });

//I get the Policy hierarchy when I select the 'components'
       this.When(/^I select the "([^"]*)" option$/, function (arg1) {
         var path='//*[@id="inner-parent-tabs"]/li[3]/a'
         return driver.wait(until.elementsLocated(By.xpath(path)),30000)
            .then(()=>{
              return page.PolicyActions.clickElement(path,"xpath")
            })  
       });

       this.Then(/^I get the Policy Hierarchy$/, function () {
          return page.PolicyActions.checkById("policy-grid-hierarchy")
       });

//Get the "Direct Stakeholder" and the "Stakeholder Community" grids when I select the 'Stakeholders'
       this.When(/^I select "([^"]*)"$/, function (arg1) {
         var path='//*[@id="inner-parent-tabs"]/li[4]/a'
         return driver.wait(until.elementsLocated(By.xpath(path)),30000)
            .then(()=>{
              return page.PolicyActions.clickElement(path,"xpath")
            })  
       });

       this.Then(/^I do get the "([^"]*)" and the "([^"]*)" grids$/, function (arg1, arg2) {
          try{
          var chk1= page.PolicyActions.checkById("policy-grid-stakeholders")
          var chk2= page.PolicyActions.checkById("object-grid-community")
          if(chk1 && chk2)
            return true;
         }catch(e){return Promise.reject(false)} 
       });

//Get list of Products havig this Policy when 'Impact' is clicked
       this.When(/^I click on "([^"]*)" option$/, function (arg1) {
          var path='//*[@id="inner-parent-tabs"]/li[5]/a'
         return driver.wait(until.elementsLocated(By.xpath(path)),30000)
            .then(()=>{
              return page.PolicyActions.clickElement(path,"xpath")
            })  
       });
 
       this.Then(/^I get the list of "([^"]*)" having this Policy$/, function (arg1) {
         return page.PolicyActions.checkById("policy-grid-Product")
       });

//get the list of "Data Quality Rules" and "Data Attributes" and alert for "Data Sets" when Data is clicked
       this.When(/^I click on "([^"]*)"$/, function (arg1) {
          var path='//*[@id="inner-parent-tabs"]/li[6]/a'
         return driver.wait(until.elementsLocated(By.xpath(path)),30000)
            .then(()=>{
              return page.PolicyActions.clickElement(path,"xpath")
            })  
       });

        this.Then(/^I get list of "([^"]*)" and "([^"]*)" and no "([^"]*)"$/, function (arg1, arg2, arg3) {
          try{
            page.PolicyActions.checkById("policy-grid-dq")
            page.PolicyActions.checkById("policy-grid-dataattribute") 
         }catch(e){return Promise.reject(false)} 
         /*try{
         return driver.wait(until.elementsLocated(By.className("alert no-margin alpha-grey")),20000);
         }catch(e){return Promise.reject(false)} */
        });

}