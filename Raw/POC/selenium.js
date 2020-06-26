//Commands for installation (Prerequisites):
// npm init -y
// npm install chromedriver
// npm install selenium-webdriver

// chromedriver => chrome
require("chromedriver");

// selenium => chromedriver
let swd = require('selenium-webdriver');

// build browser
let bldr = new swd.Builder();

// driver hi apka sara kaam karega
// driver => mainpulations
let driver = bldr.forBrowser("chrome").build();

//selenium is also promise based, matlab apka kaam poora nhn karegi, rather apko ek promise degi ki haan theek hai na yaar kar dungi na
let pageOpenPromise = driver.get("https://pepcoding.com");

pageOpenPromise.then(function(){
    console.log("Page has been opened. Hurray!");
});

pageOpenPromise.catch(function(err){
    console.log(err);
}); 