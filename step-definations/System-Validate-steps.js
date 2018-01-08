const expect = require('chai').expect;
module.exports = function () {  

//Open Home page and Login
	   this.Given(/^I open the site "([^"]*)"$/, function (arg1) {
          return helpers.loadPage(arg1)
          .then( () => {
            return page.SystemActions.clickElement("Login","linkText")      
          })
       });

       this.Given(/^login by giving valid username and password$/, function () {
         return page.SystemActions.getLoginDetails()
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

//Create a new system
       this.When(/^I click on "([^"]*)", move to "([^"]*)" and select the "([^"]*)" option$/, function (arg1, arg2, arg3) {
         return driver.wait(until.elementsLocated(By.linkText("Create")), 80000)
          .then(()=>{
            page.SystemActions.clickElement(arg1,"linkText")
            return driver.wait(until.elementsLocated(By.linkText("Data & Technology")), 90000)
            .then(()=>{
             return page.SystemActions.clickSystem()
            })
          })
       });

       this.Then(/^I see "([^"]*)" tab, Fill details, Save it$/, function (arg1) {
         return driver.wait(until.elementsLocated(By.id("field-new-title")),50000)
           .then(()=>{
            driver.findElement(By.id("field-new-title")).getText()
            .then(t => {
              console.log(t);
                 try {
                 expect(t).to.be.eql("New System")
                 }catch(e){return Promise.reject(false)}
                })
            })

           .then(()=>{
            return page.SystemActions.fillDetails()
           })
       });

       this.Then(/^then I get the "([^"]*)" option for the New System$/, function (arg1) {
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

 //Get alert box when am not providing det of mandatory fields while saving
       this.When(/^I visit the page "([^"]*)"$/, function (arg1) {
          return helpers.loadPage(arg1)
       });

       this.Then(/^I provide inputs, missing the "([^"]*)" field$/, function (arg1) {
           return driver.wait(until.elementsLocated(By.id("field-new-title")),50000)
           .then(()=>{
            driver.findElement(By.id("field-new-title")).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql("New System")
                 }catch(e){return Promise.reject(false)}
                })
            })

           .then(()=>{
            return page.SystemActions.fillWithNoName()
           })
       });

       this.Then(/^I get the alert message$/, function () {
        	return page.SystemActions.checkByClassName("alert no-margin alert-danger")
       });

//I go to search url and click on 'System' to get list of systems 
       this.When(/^I visit the url "([^"]*)"$/, function (arg1) {
          return helpers.loadPage(arg1)
       });

       this.Then(/^I search for "([^"]*)" facet, and click on it$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.xpath('//*[@id="navbar-tabs-toggle"]/ul/li[1]/a')),8000)
            .then(()=>{
              return page.SystemActions.clickElement('//*[@id="navbar-tabs-toggle"]/ul/li[1]/a',"xpath")
            })
       }); 

       this.Then(/^I get the grid having list of systems$/, function () {
         return page.SystemActions.checkById("unison_SYSTEM_grid")
       });

//Charts are displayed when ''Dashboard' is clicked
       this.When(/^I select the "([^"]*)"$/, function (arg1) {
         return driver.wait(until.elementsLocated(By.linkText("Dashboard")),8000)
            .then(()=>{
              return page.SystemActions.clickElement("Dashboard","linkText")
            })
       });

       this.Then(/^I get the Lifecycle chart$/, function () {
         return page.SystemActions.checkById("highcharts-0")
       });

//Get the Summary of system- CMD 
       this.When(/^I go to url "([^"]*)"$/, function (arg1) {
         return helpers.loadPage(arg1)
       });

       this.Then(/^I get its summary with the "([^"]*)" button$/, function (arg1) {
         try {
              driver.wait(until.elementsLocated(By.linkText("Edit")),8000)
          }catch(e){return Promise.reject(false)} 
       });

//Get the  "System Interfaces" and "Data Flow Outside the Interface" when 'Interface' is clicked
       this.When(/^I select the "([^"]*)" option$/, function (arg1) {
        var path='//*[@id="inner-parent-tabs"]/li[3]/a'
         return driver.wait(until.elementsLocated(By.xpath(path)),30000)
            .then(()=>{
              return page.SystemActions.clickElement(path,"xpath")
            })  
       });

       this.Then(/^I get the list of "([^"]*)" and "([^"]*)"$/, function (arg1, arg2) {
         try{
          var chk1= page.SystemActions.checkById("system-grid-system-level-relationships")
          var chk2= page.SystemActions.checkById("system-grid-data-level-relationships")
          if(chk1 && chk2)
            return true;
         }catch(e){return Promise.reject(false)} 
       });

//Get the "Direct Stakeholders" and the "Stakeholder Community" when 'Stakeholder' is clicked
       this.When(/^I select "([^"]*)"$/, function (arg1) {
        var path='//*[@id="inner-parent-tabs"]/li[4]/a'
         return driver.wait(until.elementsLocated(By.xpath(path)),30000)
            .then(()=>{
              return page.SystemActions.clickElement(path,"xpath")
            })  
       });

       this.Then(/^I do get the "([^"]*)" and the "([^"]*)" grids$/, function (arg1, arg2) {
          try{
          var chk1= page.SystemActions.checkById("system-grid-signoff")
          var chk2= page.SystemActions.checkById("object-grid-community")
          if(chk1 && chk2)
            return true;
         }catch(e){return Promise.reject(false)} 
       });

//Get product details on clicking 'Impact'
       this.When(/^I click on "([^"]*)" option$/, function (arg1) {
         var path='//*[@id="inner-parent-tabs"]/li[5]/a'
         return driver.wait(until.elementsLocated(By.xpath(path)),30000)
            .then(()=>{
              return page.SystemActions.clickElement(path,"xpath")
            })  
       });

       this.Then(/^I get the "([^"]*)" having this System$/, function (arg1) {
         return page.SystemActions.checkById("system-grid-Product")
       });

}