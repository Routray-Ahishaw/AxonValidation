const expect = require('chai').expect;

module.exports = {

	clickLogin: function (login) {
		//find and click login button
		driver.findElement(By.linkText(login)).click();
		console.log("Login clicked-Login form appears");
	},

	getLoginDetails: function(uname, pwd){
		driver.findElement(By.name("_username")).sendKeys(uname); 
		driver.findElement(By.name("_password")).sendKeys(pwd); 
		driver.findElement(By.className("btn btn-info btn-block")).click();
		console.log("Login details are filled");
	},

	getUsername: function(uname){
		driver.findElement(By.name("_username")).sendKeys(uname); 
		driver.findElement(By.className("btn btn-info btn-block")).click();
		console.log("Username is filled");
	},
	getPassword: function(password){
		driver.findElement(By.name("_password")).sendKeys(password); 
		driver.findElement(By.className("btn btn-info btn-block")).click();
		console.log("Password is filled");
	}
};



 