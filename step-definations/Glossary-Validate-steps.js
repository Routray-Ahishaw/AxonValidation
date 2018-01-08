const expect = require('chai').expect;
module.exports = function () {  

//Open Home page and Login
       this.Given(/^I open the site "([^"]*)"$/, function (arg1) {
           return helpers.loadPage(arg1)
          .then( () => {
            return page.GlossaryValidateActions.clickElement("Login","linkText")      
          })
       });

       this.Given(/^login by giving valid username and password$/, function () {
          return page.GlossaryValidateActions.getLoginDetails()
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

//Create a new glossary with mandatory fields
       this.When(/^I click on "([^"]*)", move to "([^"]*)" and select the "([^"]*)" option$/, function (arg1, arg2, arg3) {
         	return driver.wait(until.elementsLocated(By.linkText("Create")), 80000)
          .then(()=>{
            page.GlossaryValidateActions.clickElement(arg1,"linkText")
            return driver.wait(until.elementsLocated(By.linkText("Data & Technology")), 90000)
            .then(()=>{
             return page.GlossaryValidateActions.clickGlossary()
            })
          })
       });  

       this.Then(/^I see "([^"]*)" tab, Fill details, click on "([^"]*)"$/, function (arg1, arg2) {
        	return driver.wait(until.elementsLocated(By.id("field-new-title")),50000)
           .then(()=>{
            driver.findElement(By.id("field-new-title")).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql("New Glossary")
                 }catch(e){return Promise.reject(false)}
                })
            })

           .then(()=>{
            return page.GlossaryValidateActions.fillDetails()
           })
       });

       this.Then(/^then I get the "([^"]*)" option for the New Glossary$/, function (arg1) {
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

//Trying to Create a new glossary, without specifying certain mandatory field
        this.When(/^I visit the page "([^"]*)"$/, function (arg1) {
            return helpers.loadPage(arg1)
        });

        this.Then(/^I provide inputs, missing the "([^"]*)" field$/, function (arg1) {
            return driver.wait(until.elementsLocated(By.id("field-new-title")),50000)
           .then(()=>{
            driver.findElement(By.id("field-new-title")).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql("New Glossary")
                 }catch(e){return Promise.reject(false)}
                })
            })

           .then(()=>{
            return page.GlossaryValidateActions.fillWithNoName()
           })
        });

        this.Then(/^I get the alert message$/, function () {
            try{
                  return driver.wait(until.elementsLocated(By.className("alert no-margin alert-danger")),8000)
                }catch(e){return false;}
        });

//Verify the items in the Glossary list
        this.When(/^I visit the url "([^"]*)"$/, function (arg1) {
            return helpers.loadPage(arg1)
       });

       this.Then(/^I search for "([^"]*)" facet, and click on it$/, function (arg1) {
            return driver.wait(until.elementsLocated(By.id("tab-unison-GLOSSARY-counter-loading")),8000)
            .then(()=>{
              return page.GlossaryValidateActions.clickElement("tab-unison-GLOSSARY-counter-loading","id")
            })
       });

       this.Then(/^I get the grid having list of glossary$/, function () {
            try{
              driver.findElement(By.xpath('//*[@id="unison_GLOSSARY_grid"]/div[1]/table'))
            } catch(e){return false;}
       });

//Verify the chart in the Dashboard
       this.When(/^I select the "([^"]*)"$/, function (arg1) {
            return driver.wait(until.elementsLocated(By.linkText("Dashboard")),8000)
            .then(()=>{
              return page.GlossaryValidateActions.clickElement("Dashboard","linkText")
            })
       });

       this.Then(/^I get the Lifecycle chart$/, function () {
           try{
              driver.wait(until.elementsLocated(By.className("highcharts-title")),30000)
            } catch(e){return false;}
       });

//Verify the details of a particular glossary
       this.When(/^I go to url "([^"]*)" and select the "([^"]*)" facet$/, function (arg1, arg2) {
          return helpers.loadPage(arg1)
          .then(()=>{
          return driver.wait(until.elementsLocated(By.id("tab-unison-GLOSSARY-counter-loading")),8000)
            .then(()=>{
              return page.GlossaryValidateActions.clickElement("tab-unison-GLOSSARY-counter-loading","id")
            })
          })
       });

//check for Summary of a facet
       this.Then(/^I get the gossary list, from there I select "([^"]*)"$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.linkText("Party Data")),8000)
            .then(()=>{
              return page.GlossaryValidateActions.clickElement(arg1,"linkText")
            })  
       });

       this.Then(/^I get its summary with the "([^"]*)" button$/, function (arg1) {
          try {
              driver.wait(until.elementsLocated(By.linkText("Edit")),8000)
          }catch(e){return Promise.reject(false)} 
       });

//Check for 'Glossary Hierarchy', when 'Relationship' is clicked
       this.When(/^I select the "([^"]*)" option$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.xpath('//*[@id="inner-parent-tabs"]/li[3]/a')),30000)
            .then(()=>{
              return page.GlossaryValidateActions.clickElement('//*[@id="inner-parent-tabs"]/li[3]/a',"xpath")
            })  
       });

       this.Then(/^I get the "([^"]*)" text as the heading of the grid$/, function (arg1) {
        return page.GlossaryValidateActions.checkById("tab-category-relationships-hierarchical")
       });

//'Direct Stakeholders' and the 'Stakeholder Community' grids are shown when 'Stakeholder' is clicked
       this.When(/^I select "([^"]*)"$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.xpath('//*[@id="inner-parent-tabs"]/li[5]/a')),10000)
            .then(()=>{
              return page.GlossaryValidateActions.clickElement('//*[@id="inner-parent-tabs"]/li[5]/a',"xpath")
            })  
       });

       this.Then(/^I do get the "([^"]*)" and the "([^"]*)" grids$/, function (arg1, arg2) {
        try{
          var chk1= page.GlossaryValidateActions.checkById("glossary-grid-stakeholders")
          var chk2= page.GlossaryValidateActions.checkById("object-grid-community")
          if(chk1 && chk2)
            return true;
         }catch(e){return Promise.reject(false)} 
       });

//I get the 'product' name, which is linked to the grid item, when 'Impact' is clicked 
       this.When(/^I click on "([^"]*)" option$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.xpath('//*[@id="inner-parent-tabs"]/li[6]/a')),8000)
            .then(()=>{
              return page.GlossaryValidateActions.clickElement('//*[@id="inner-parent-tabs"]/li[6]/a',"xpath")
            })  
       });

       this.Then(/^I get the name of the product, in which this Glossary item is present$/, function () {
          return page.GlossaryValidateActions.checkById("catitemcategory-grid-Product")
       });

//I get the "Data Instances", when i click on 'Data'
       this.When(/^I click on "([^"]*)"$/, function (arg1) {
          return driver.wait(until.elementsLocated(By.xpath('//*[@id="inner-parent-tabs"]/li[7]/a')),8000)
            .then(()=>{
              return page.GlossaryValidateActions.clickElement('//*[@id="inner-parent-tabs"]/li[7]/a',"xpath")
            })  
       });

       this.Then(/^I get the "([^"]*)" and the "([^"]*)"$/, function (arg1, arg2) {
           return page.GlossaryValidateActions.checkById("glossary-grid-dataitem")
       });

}
