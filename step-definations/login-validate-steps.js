const expect = require('chai').expect;
module.exports = function () {   

// Initially will open http://ms-axon-development.local:8888/ page and the Login button should be clicked
       this.Given(/^I open the site "([^"]*)"$/, function (arg1) {
        return helpers.loadPage('http://ms-axon-development.local:8888/')
         .then( () => {
           return page.loginValidateActions.clickLogin("Login")  
           console.log("Login Clicked");      
         })
       });

//Login with valid credentials
       this.When(/^I enter "([^"]*)" as username and "([^"]*)" as password$/, function (arg1, arg2) {
         return page.loginValidateActions.getLoginDetails(arg1 , arg2)
       });

       this.Then(/^I should see "([^"]*)" as the username$/, function (arg1) {
        return driver.wait(until.elementsLocated(By.xpath('//*[@id="navbar-mobile"]/div/ul/li[3]/a/span')), 20000)
            .then(() => {
             driver.findElement(By.xpath('//*[@id="navbar-mobile"]/div/ul/li[3]/a/span')).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql(arg1)
                }catch(e){return Promise.reject(false)}
              })
            })
       });

//Login with invalid credentials
       this.When(/^I enter "([^"]*)" as wrong username and "([^"]*)" as password$/, function (arg1, arg2) {
          return page.loginValidateActions.getLoginDetails(arg1 , arg2)
       });

       this.Then(/^I should see "([^"]*)" in the alert box$/, function (arg1) {
           return driver.wait(until.elementsLocated(By.className("alert alert-danger")), 50000)
            .then(() => {
             driver.findElement(By.className("alert alert-danger")).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql(arg1)
                }catch(e){return Promise.reject(false)}
              })
            })
       });

//Login with valid username but no password
        this.When(/^I enter "([^"]*)" as username and keep password as blank$/, function (arg1) {
            return page.loginValidateActions.getUsername(arg1)
       });

        this.Then(/^I should see "([^"]*)" as warning$/, function (arg1) {
             return driver.wait(until.elementsLocated(By.className("alert alert-danger")), 50000)
            .then(() => {
             driver.findElement(By.className("alert alert-danger")).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql(arg1)
                }catch(e){return Promise.reject(false)}
              })
            })
       });

//Login with blank username but a password
       this.When(/^I enter "([^"]*)" as password and keep username as blank$/, function (arg1) {
            return page.loginValidateActions.getPassword(arg1)
       });

        this.Then(/^I should see "([^"]*)" in alert box$/, function (arg1) {
             return driver.wait(until.elementsLocated(By.className("alert alert-danger")), 50000)
            .then(() => {
             driver.findElement(By.className("alert alert-danger")).getText()
            .then(t => {
                 try {
                 expect(t).to.be.eql(arg1)
                }catch(e){return Promise.reject(false)}
              })
            })
       });
}

