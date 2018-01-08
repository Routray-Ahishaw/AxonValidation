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
          }catch(e){return Promise.reject(false);} 
	},

	checkByClassName: function(element){
		 try {
              return driver.wait(until.elementsLocated(By.className(element)),20000);
          }catch(e){return Promise.reject(false);} 
	},

	clickDataSet: function () {
		driver.actions().mouseMove(driver.findElement(By.linkText("Data & Technology"))).perform();
		//check for "Glossary" tab
		try{
			driver.findElement(By.linkText("Data Set"));
		}catch(e) { return false; }	
		driver.actions().mouseMove(driver.findElement(By.linkText("Data Set"))).perform();
		driver.findElement(By.linkText("Data Set")).click();
		console.log("'Data Set' clicked"); 	
	},

	fillDetails: function(){
		driver.findElement(By.name("axon_appbundle_catalogueitemtype[PrimaryName]")).sendKeys("DataSetDemo01"); 
		driver.findElement(By.id("select2-axon_appbundle_catalogueitemtype_CatalogueItemSystem-container")).click();
		driver.findElement(By.xpath('//*[@id="axon_appbundle_catalogueitemtype_CatalogueItemSystem"]/option[2]')).click();
		driver.findElement(By.name("axon_appbundle_catalogueitemtype[Definition]")).sendKeys("This is first Data Set.");
		//driver.findElement(By.xpath('//*[@id="axon_appbundle_catalogueitemtype_CatalogueItemCatItemCategory_button"]')).click();
		//driver.findElement(By.xpath('//*[@id="axon_appbundle_catalogueitemtype_CatalogueItemCatItemCategory_grid"]/div[2]/table/tbody/tr[2]')).click();
		console.log("Details are filled");
		driver.findElement(By.id("save_close")).click();
	},

	fillWithNoName: function(arg){
		driver.findElement(By.id("select2-axon_appbundle_catalogueitemtype_CatalogueItemSystem-container")).click();
		driver.findElement(By.xpath('//*[@id="axon_appbundle_catalogueitemtype_CatalogueItemSystem"]/option[2]')).click();
		driver.findElement(By.name("axon_appbundle_catalogueitemtype[Definition]")).sendKeys("This is first Data Set.");
		//driver.findElement(By.id("axon_appbundle_catalogueitemtype_CatalogueItemCatItemCategory_button")).click();
		//driver.findElement(By.xpath('//*[@id="axon_appbundle_catalogueitemtype_CatalogueItemCatItemCategory_grid"]/div[2]/table/tbody/tr[2]')).click();
		console.log("Details are filled");
		driver.findElement(By.id("save_close")).click();
	}

};
