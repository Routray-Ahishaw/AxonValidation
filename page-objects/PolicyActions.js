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
	checkByClassName: function(element){
		 try {
             return driver.wait(until.elementsLocated(By.className(element)),20000);
          }catch(e){return Promise.reject(false);} 
	},


	clickPolicy: function () {
		driver.actions().mouseMove(driver.findElement(By.linkText("Business & Change"))).perform();
		//check for "Policy" tab
		try{
			driver.findElement(By.linkText("Policy"));
		}catch(e) { return false; }	
		driver.actions().mouseMove(driver.findElement(By.linkText("Policy"))).perform();
		driver.findElement(By.linkText("Policy")).click();
		console.log("'Policy' clicked"); 	
	},

	viewPolicy: function () {
		driver.actions().mouseMove(driver.findElement(By.linkText("Business & Change"))).perform();
		var path='//*[@id="tools-facets-menu"]/li[2]/ul/li[4]';
		//check for "Policy" tab
		driver.wait(until.elementsLocated(By.xpath(path)));
		driver.findElement(By.xpath(path)).click();
		console.log("'Policy' viewed"); 
	},

	fillDetails: function(){
		driver.findElement(By.name("axon_appbundle_policytype[PrimaryName]")).sendKeys("PolicyTest02"); 
		driver.findElement(By.name("axon_appbundle_policytype[RefNumber]")).sendKeys("PT01");
		driver.findElement(By.name("axon_appbundle_policytype[Description]")).sendKeys("This is demo policy.");
		//select 'Data Standard' as 'Type' 
		driver.findElement(By.xpath('//*[@id="select2-axon_appbundle_policytype_PolicyPolicyType-container"]')).click();
		driver.findElement(By.xpath('//*[@id="axon_appbundle_policytype_PolicyPolicyType"]/option[2]')).click();
		//deselct 'Internal'
		//driver.findElement(By.name("axon_appbundle_policytype[Internal]")).setAttribute("checked", "");
		//driver.wait(until.elementsLocated(By.id("axon_appbundle_policytype_Internal")),20000);
		//driver.findElement(By.id("axon_appbundle_policytype_Internal")).click();
		driver.executeScript('$("#axon_appbundle_policytype_Internal").click');
		driver.sleep(3000);
		console.log("Details are filled");
		driver.findElement(By.id("save_close")).click();
	},

	fillWithNoName: function(arg){
		driver.findElement(By.name("axon_appbundle_policytype[RefNumber]")).sendKeys("PT02");
		driver.findElement(By.name("axon_appbundle_policytype[Description]")).sendKeys("This is demo policy.");
		//select 'Data Standard' as 'Type' 
		driver.findElement(By.xpath('//*[@id="select2-axon_appbundle_policytype_PolicyPolicyType-container"]')).click();
		driver.findElement(By.xpath('//*[@id="axon_appbundle_policytype_PolicyPolicyType"]/option[2]')).click();	

		driver.findElement(By.id("save_close")).click();
	}

};
