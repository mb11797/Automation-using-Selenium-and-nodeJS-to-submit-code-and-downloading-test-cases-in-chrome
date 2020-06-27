// npm install -y
// npm install selenium-webdriver
// npm install chromedriver

let fs = require("fs");

let credentials = process.argv[2];
let un, pn;

// chromedriver
require("chromedriver");

// selenium
let swd = require('selenium-webdriver');

// builder => browser
let bldr = new swd.Builder();

// driver => 1 tab
let driver = bldr.forBrowser("chrome").build();

let credentialWillBeReadPromise = fs.promises.readFile(credentials);
credentialWillBeReadPromise.then(function(content){
    let {userName, password} = JSON.parse(content);
    un = userName;
    pn = password;
}).then(function(){
    let tabWillBeOpenedPromise = driver.get("https://pepcoding.com/login");
    return tabWillBeOpenedPromise
}).then(function(){
    console.log("Tab was successfully opened");
}).then(function(){
    let emailWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=email]")); 
    let passwordWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=password]"));
    //for parallel work
    let combinedPromise = Promise.all([emailWillBeSelectedPromise, passwordWillBeSelectedPromise]);
    return combinedPromise;
}).then(function(elements){
    let emailWillBeInputPromise = elements[0].sendKeys(un);
    let passwordWillBeInputPromise = elements[1].sendKeys(pn);
    //for parallel work
    let combinedPromise = Promise.all([emailWillBeInputPromise, passwordWillBeInputPromise]);
    return combinedPromise;
}).then(function(){
    console.log("Email and Password are enetered");
}).then(function(){
    let submitBtnWillBeSelectedPromise = driver.findElement(swd.By.css("button[type=submit]"));
    return submitBtnWillBeSelectedPromise;
}).then(function(submitBtn){
    let submitBtnWillBeClickedPromise = submitBtn.click();
    return submitBtnWillBeClickedPromise;
}).then(function(){
    console.log("User Logged In Successfully.");
}).then(function(){
    let coursePageURLPromise = driver.get("https://www.pepcoding.com/resources/");
    return coursePageURLPromise;
}).then(function(){
    console.log("Opened courses page.");
}).catch(function(err){
    console.log(err);
});

console.log("I will be first");