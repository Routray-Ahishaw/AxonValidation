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
             	return driver.wait(until.elementsLocated(By.id(element)),10000);
          }catch(e){return Promise.reject(false);} 
	},

	clickGlossary: function () {
		driver.actions().mouseMove(driver.findElement(By.linkText("Data & Technology"))).perform();
		//check for "Glossary" tab
		try{
			return driver.findElement(By.linkText("Glossary"));
		}catch(e) { return false; }	
		driver.actions().mouseMove(driver.findElement(By.linkText("Glossary"))).perform();
		driver.findElement(By.linkText("Glossary")).click();
		console.log("'Glossary' clicked"); 	
	},

	fillDetails: function(){
		driver.findElement(By.id("axon_appbundle_catitemcategorytype_PrimaryName")).sendKeys("GlossaryTest4"); 
		driver.findElement(By.name("axon_appbundle_catitemcategorytype[Description]")).sendKeys("This is demo glossary.");
		driver.findElement(By.xpath('//*[@id="select2-axon_appbundle_catitemcategorytype_FormatType-container"]')).click();
		driver.findElement(By.xpath('//*[@id="axon_appbundle_catitemcategorytype_FormatType"]/option[4]')).click();	
		console.log("Details are filled");
		driver.findElement(By.id("save_close")).click();
	},

	fillWithNoName: function(arg){
		driver.findElement(By.name("axon_appbundle_catitemcategorytype[Description]")).sendKeys("This is demo glossary.");
		driver.findElement(By.xpath('//*[@id="select2-axon_appbundle_catitemcategorytype_FormatType-container"]')).click();
		driver.findElement(By.xpath('//*[@id="axon_appbundle_catitemcategorytype_FormatType"]/option[4]')).click();	
		console.log("Details are filled without Name");
		driver.findElement(By.id("save_close")).click();
	}

};
