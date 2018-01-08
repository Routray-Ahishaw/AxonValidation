const expect = require('chai').expect;

module.exports = {

	getLoginDetails: function(){
		driver.findElement(By.name("_username")).sendKeys("admin@informatica.com"); 
		driver.findElement(By.name("_password")).sendKeys("changeme"); 
		console.log("Provide Login Details");
		driver.findElement(By.className("btn btn-info btn-block")).click();
	},

	clickElement: function (element,type) {
		if(type=="linkText")
			driver.findElement(By.linkText(element)).click();
		if(type=="id")
			driver.findElement(By.id(element)).click();
		if(type=="xpath")
			driver.findElement(By.xpath(element)).click();
		console.log("Element is clicked");
	},

	checkById: function(element){
		 try {
              return driver.wait(until.elementsLocated(By.id(element)),20000);
              console.log("Checked");
          }catch(e){return Promise.reject(false);} 
	},

	checkByClassName: function(element){
		 try {
             return driver.wait(until.elementsLocated(By.className(element)),20000);
          }catch(e){return Promise.reject(false);} 
	},

	clickSystem: function () {
		driver.actions().mouseMove(driver.findElement(By.linkText("Data & Technology"))).perform();
		//check for "System" tab
		try{
			driver.findElement(By.linkText("System"));
		}catch(e) { return false; }	
		driver.actions().mouseMove(driver.findElement(By.linkText("System"))).perform();
		driver.findElement(By.linkText("System")).click();
		console.log("'System' clicked"); 	
	},

	fillDetails: function(){
		driver.findElement(By.name('axon_appbundle_systemtype[PrimaryName]')).sendKeys("System02"); 
		driver.findElement(By.name("axon_appbundle_systemtype[Description]")).sendKeys("This is a demo System");
		driver.findElement(By.id("select2-axon_appbundle_systemtype_Type-container")).click();
		driver.findElement(By.xpath('//*[@id="axon_appbundle_systemtype_Type"]/option[5]')).click();
		driver.findElement(By.id("select2-axon_appbundle_systemtype_External-container")).click();
		driver.findElement(By.xpath('//*[@id="axon_appbundle_systemtype_External"]/option[3]')).click();
		console.log("Details are filled");
		driver.executeScript('$("#save_close").click()');
	},

	fillWithNoName: function(arg){
		driver.findElement(By.name("axon_appbundle_systemtype[Description]")).sendKeys("This is a demo System");
		driver.findElement(By.id("select2-axon_appbundle_systemtype_Type-container")).click();
		driver.findElement(By.xpath('//*[@id="axon_appbundle_systemtype_Type"]/option[5]')).click();
		driver.findElement(By.id("select2-axon_appbundle_systemtype_External-container")).click();
		driver.findElement(By.xpath('//*[@id="axon_appbundle_systemtype_External"]/option[3]')).click();
		console.log("Details are filled");
		driver.findElement(By.id("save_close")).click();
	}

};
