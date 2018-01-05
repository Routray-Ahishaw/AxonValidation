const expect = require('chai').expect;

module.exports = {

	clickLogin: function (login) {
		//find and click login button
		driver.findElement(By.linkText(login)).click();
		//verify for "User Login" text in the login form
        if(driver.findElement(By.xpath('//div [contains(text(),"User login")]')))
        	console.log("Element-'User login' found");
        else
        	console.log("Element-'User login' Not found");
        console.log("Display of Login Box ");
	},

	getLoginDetails: function(){
		driver.findElement(By.name("_username")).sendKeys("admin@informatica.com"); 
		driver.findElement(By.name("_password")).sendKeys("changeme"); 
		console.log("Provide Login Details");
		//login clicked
		driver.findElement(By.className("btn btn-info btn-block")).click();
	},

	clickCreate: function () {
		driver.findElement(By.linkText("Create")).click();
		console.log("'Create' is clicked");
	},

	clickProcess: function () {
		//find and click Business & Change button
		driver.actions().mouseMove(driver.findElement(By.linkText("Business & Change"))).perform();
		//check for "Process" tab
		if(driver.findElement(By.linkText("Process"))){
			driver.actions().mouseMove(driver.findElement(By.linkText("Process"))).perform();
			driver.findElement(By.linkText("Process")).click();
		}
       	else
        console.log("Element-'Process' Not found");
		console.log("'Process' clicked"); 	
	},

	fillDetails: function(){
		driver.findElement(By.xpath('//*[@id="axon_appbundle_processtype_PrimaryName"]')).sendKeys("DemoTest12"); 
		driver.findElement(By.name("axon_appbundle_processtype[RefNumber]")).sendKeys("PDT012");
		driver.findElement(By.name("axon_appbundle_processtype[Description]")).sendKeys("This is a new demo process");
		driver.findElement(By.id("select2-axon_appbundle_processtype_ProcessDurationType-container")).click();
		driver.findElement(By.xpath('//*[@id="axon_appbundle_processtype_ProcessDurationType"]/option[3]')).click();
		driver.findElement(By.id("axon_appbundle_processtype_Duration")).sendKeys("20");
		console.log("Details are filled");
		driver.executeScript('$("#save_close").click()');
	},

	fillWithTP: function(arg){
		driver.findElement(By.xpath('//*[@id="axon_appbundle_processtype_PrimaryName"]')).sendKeys("DemoTest22"); 
		driver.findElement(By.name("axon_appbundle_processtype[RefNumber]")).sendKeys("PDT022");
		driver.findElement(By.name("axon_appbundle_processtype[Description]")).sendKeys("This is a new demo process");
		driver.findElement(By.id("axon_appbundle_processtype_Duration")).sendKeys(arg);
		console.log("Details filled with Duration=20");
		driver.executeScript('$("#save_close").click()');
	},

	fillWithTValue: function(){
		driver.findElement(By.xpath('//*[@id="axon_appbundle_processtype_PrimaryName"]')).sendKeys("DemoTest32"); 
		driver.findElement(By.name("axon_appbundle_processtype[RefNumber]")).sendKeys("PDT032");
		driver.findElement(By.name("axon_appbundle_processtype[Description]")).sendKeys("This is a new demo process");
		driver.findElement(By.id("select2-axon_appbundle_processtype_ProcessDurationType-container")).click();
		driver.findElement(By.xpath('//*[@id="axon_appbundle_processtype_ProcessDurationType"]/option[3]')).click();
		console.log("Details filled with Duration=Days");
		driver.executeScript('$("#save_close").click()');
	},

	fillWithNoName: function(arg){
		driver.findElement(By.name("axon_appbundle_processtype[RefNumber]")).sendKeys("PDT042");
		driver.findElement(By.name("axon_appbundle_processtype[Description]")).sendKeys("This is a new demo process");
		console.log("Details filled with no name");
		driver.executeScript('$("#save_close").click()');
	}

};
