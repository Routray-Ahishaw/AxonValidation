const expect = require('chai').expect;
module.exports = function () {  

//Open Home page and Login
       this.Given(/^I open the site "([^"]*)"$/, function (arg1) {
          return helpers.loadPage(arg1)
          .then( () => {
            return page.DataSetActions.clickElement("Login","linkText")      
          })
       });

       this.Given(/^login by giving valid username and password$/, function () {
          return page.DataSetActions.getLoginDetails()
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

//Create a new data set with mandatory fields 
       this.When(/^I click on "([^"]*)", move to "([^"]*)" and select the "([^"]*)" option$/, function (arg1, arg2, arg3) {
          return driver.wait(until.elementsLocated(By.linkText("Create")), 80000)
          .then(()=>{
            page.DataSetActions.clickElement(arg1,"linkText")
            return driver.wait(until.elementsLocated(By.linkText("Data & Technology")), 90000)
            .then(()=>{
             return page.DataSetActions.clickDataSet()
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
                 expect(t).to.be.eql("New Data Item")
                 }catch(e){return Promise.reject(false)}
                })
            })

           .then(()=>{
            return page.DataSetActions.fillDetails()
           })
       });

       this.Then(/^then I get the "([^"]*)" option for the New Data Set$/, function (arg1) {
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
   
//Trying to Create a new Data Set, without specifying certain mandatory field
        this.When(/^I visit the page "([^"]*)"$/, function (arg1) {
          return helpers.loadPage(arg1)
        });

        this.Then(/^I provide inputs, missing the "([^"]*)" field$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.id("field-new-title")),50000)
           .then(()=>{
            driver.findElement(By.id("field-new-title")).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql("New Data Item")
                 }catch(e){return Promise.reject(false)}
                })
            })

           .then(()=>{
            return page.DataSetActions.fillWithNoName()
           })
        });

        this.Then(/^I get the alert message$/, function () {
          return page.DataSetActions.checkByClassName("alert no-margin alert-danger")
        });

//View the items in the Data Set list and the chart in the Dashboard
        this.When(/^I visit the url "([^"]*)"$/, function (arg1) {
          return helpers.loadPage(arg1)
        });

        this.Then(/^I search for "([^"]*)" facet, and click on it$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.xpath('//*[@id="navbar-tabs-toggle"]/ul/li[4]/a')),8000)
            .then(()=>{
              return page.DataSetActions.clickElement('//*[@id="navbar-tabs-toggle"]/ul/li[4]/a',"xpath")
            })
        });

        this.Then(/^I get the grid having list of data sets$/, function () {
          return page.DataSetActions.checkById("unison_SYSTEM_grid")
        });

//view the chart, when Dashboard is clicked
        this.When(/^I select the "([^"]*)"$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.linkText("Dashboard")),8000)
            .then(()=>{
              return page.DataSetActions.clickElement("Dashboard","linkText")
            })
        });

        this.Then(/^I get the Lifecycle chart$/, function () {
          return page.DataSetActions.checkById("highcharts-0")
        });

//View the summary of a "Legal Entity record" data set
        this.When(/^I go to url "([^"]*)"$/, function (arg1) {
          return helpers.loadPage(arg1)
        });

        this.Then(/^I get its summary with the "([^"]*)" button$/, function (arg1) {
           try {
              driver.wait(until.elementsLocated(By.linkText("Edit")),8000)
          }catch(e){return Promise.reject(false)} 
        });

//verify the list of attribute structure when 'Attribute' is clicked
        this.When(/^I select the "([^"]*)" option$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.xpath('//*[@id="inner-parent-tabs"]/li[2]/a')),30000)
            .then(()=>{
              return page.DataSetActions.clickElement('//*[@id="inner-parent-tabs"]/li[2]/a',"xpath")
            })  
        });

        this.Then(/^I get the list of attributes structure$/, function () {
          return page.DataSetActions.checkById("data-grid-components")
        });

//Get inbound and outbound rel when Relationships option is selected
        this.When(/^I select "([^"]*)" option$/, function (arg1) {
           return driver.wait(until.elementsLocated(By.xpath('//*[@id="inner-parent-tabs"]/li[3]/a')),30000)
            .then(()=>{
              return page.DataSetActions.clickElement('//*[@id="inner-parent-tabs"]/li[3]/a',"xpath")
            })  
        });

        this.Then(/^I find the "([^"]*)" and the "([^"]*)"$/, function (arg1, arg2) {
           try{
          var chk1= page.DataSetActions.checkById("data-grid-relationships")
          var chk2= page.DataSetActions.checkById("data-grid-usedin")
          if(chk1 && chk2)
            return true;
         }catch(e){return Promise.reject(false)} 
        });

//Get the "Data Sets", "Data Attributes" and the "Stakeholder Community" grids when Stakeholders is clicked
        this.When(/^I select "([^"]*)"$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.xpath('//*[@id="inner-parent-tabs"]/li[4]/a')),30000)
            .then(()=>{
              return page.DataSetActions.clickElement('//*[@id="inner-parent-tabs"]/li[4]/a',"xpath")
            })  
        });

        this.Then(/^I do get the "([^"]*)", "([^"]*)" and the "([^"]*)" grids$/, function (arg1, arg2, arg3) { 
          try{
          var chk1= page.DataSetActions.checkById("data-grid-stakeholders")
          var chk2= page.DataSetActions.checkByClassName("alert no-margin alpha-grey")
          var chk3= page.DataSetActions.checkById("object-grid-community")  
          if(chk1 && chk2 && chk3)
            return true;
         }catch(e){return Promise.reject(false)}   
        });

//Get "Details" of all rules in form of grid when Data Quality is clicked 
        this.When(/^I click on "([^"]*)" and then the "([^"]*)"$/, function (arg1, arg2) {
          return driver.wait(until.elementsLocated(By.xpath('//*[@id="inner-parent-tabs"]/li[5]/a')),30000)
            .then(()=>{
              return page.DataSetActions.clickElement('//*[@id="inner-parent-tabs"]/li[5]/a',"xpath")
              return driver.wait(until.elementsLocated(By.xpath('//*[@id="tab-data-dq"]/ul/li[2]/a')),8000)
              .then(()=>{
                 return page.DataSetActions.clickElement('//*[@id="tab-data-dq"]/ul/li[2]/a',"xpath")
              })
            })  
        });

        this.Then(/^I get "([^"]*)" of all rules in form of grid$/, function (arg1) {
          return page.DataSetActions.checkById("tab-data-dq-details")    
        });

//Get the list of "Process" having this data set when Impact is clicked
        this.When(/^I click on "([^"]*)" option$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.xpath('//*[@id="inner-parent-tabs"]/li[6]/a')),30000)
            .then(()=>{
              return page.DataSetActions.clickElement('//*[@id="inner-parent-tabs"]/li[6]/a',"xpath")
            })  
        });

        this.Then(/^I get the list of "([^"]*)" having this data set$/, function (arg1) {
          return page.DataSetActions.checkById("tab-catalogueitem-Process") 
        });

//check for Attributes list when Attribute facet is selected
       this.When(/^I visit url "([^"]*)"$/, function (arg1) {
         return helpers.loadPage(arg1)
       });

       this.Then(/^I go to "([^"]*)" facet, and click on it$/, function (arg1) {
         return driver.wait(until.elementsLocated(By.xpath('//*[@id="navbar-tabs-toggle"]/ul/li[5]/a')),8000)
            .then(()=>{
              return page.DataSetActions.clickElement('//*[@id="navbar-tabs-toggle"]/ul/li[5]/a',"xpath")
            })
       });

       this.Then(/^I get the grid having list of attributes$/, function () {
         return page.DataSetActions.checkById("tab-unison-ATTRIBUTE")
       });

//Get the charts when Dashboard is selected
       this.When(/^I select its "([^"]*)" option$/, function (arg1) {
         return driver.wait(until.elementsLocated(By.linkText("Dashboard")),8000)
            .then(()=>{
              return page.DataSetActions.clickElement("Dashboard","linkText")
            })
       });

       this.Then(/^I get the charts, where "([^"]*)" chart is shown first$/, function (arg1) {
         return page.DataSetActions.checkById("unison_ATTRIBUTE_dashboard")
       });

//When I select a particular Attribute, I find its realated Data Set summary
      this.When(/^I select "([^"]*)" after going to search url "([^"]*)"$/, function (arg1, arg2) {
         return helpers.loadPage(arg2)
         .then(()=>{
             return driver.wait(until.elementsLocated(By.xpath('//*[@id="navbar-tabs-toggle"]/ul/li[5]/a')),8000)
            .then(()=>{
              return page.DataSetActions.clickElement('//*[@id="navbar-tabs-toggle"]/ul/li[5]/a',"xpath")
            })
         })
       });

       this.Then(/^I click on "([^"]*)" from the Attribute list$/, function (arg1) {
            return driver.wait(until.elementsLocated(By.linkText("CMD ID")),8000)
            .then(()=>{
              return page.DataSetActions.clickElement("CMD ID","linkText")
            })
       });

       this.Then(/^I get the "([^"]*)" option for its related Data Set Summary$/, function (arg1) {
         try {
              driver.wait(until.elementsLocated(By.linkText("Edit")),8000)
          }catch(e){return Promise.reject(false)} 
       });
}