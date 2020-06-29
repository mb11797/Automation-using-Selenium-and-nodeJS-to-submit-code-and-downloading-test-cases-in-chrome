// npm install -y
// npm install selenium-webdriver
// npm install chromedriver

let fs = require("fs");

let credentials = process.argv[2];
let metadata = process.argv[3];
let courseName = process.argv[4];
let un, pn;
let gce;            //global course element 




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
}).then(overlayWillBeDismissedPromise)
.then(function(){
    let cardElementWillBeSelectedPromise = driver.findElements(swd.By.css(".card-image h2"));
    return cardElementWillBeSelectedPromise;
}).then(function(elements){
    gce = elements;
    //extract name of the courses
    let tPromisesArray = [];
    for(let i=0; i<elements.length; i++){
        let elementTextPromise = elements[i].getText();
        tPromisesArray.push(elementTextPromise);
    }
    return Promise.all(tPromisesArray);
}).then(function(elementsText){
    let i;
    for(i=0; i<elementsText.length; i++){
        if(courseName == elementsText[i]){
            break;
        }
    }
    let courseWillBeClickedPromise = gce[i].click();
    return courseWillBeClickedPromise;
}).then(function(){
    console.log("Reached Inside our Course.");
}).then(function(){
    // read metadata.json file
    let fileReadPromise = fs.promises.readFile(metadata);
    return fileReadPromise;
}).then(function(content){
    let questions = JSON.parse(content);
    let questionWillBeSolvedPromise = solveQuestion(questions[0]);
    return questionWillBeSolvedPromise;
}).then(function(){
    console.log("Question has been submitted.");
}).catch(function(err){
    console.log(err);
});

//problem submit, test case download
function solveQuestion(question){
    return new Promise(function(resolve, reject){
        let qPageWillBeOpenedPromise = goToQuestionPage(question);
        qPageWillBeOpenedPromise.then(overlayWillBeDismissedPromise).then(function(){
            let editorTabWillBeSelectedPromise = driver.findElement(swd.By.css(".tab.bold.editorTab"));
            return editorTabWillBeSelectedPromise;
        }).then(function(editorTab){
            let editorTabWillBeClickedPromise = editorTab.click();
            return editorTabWillBeClickedPromise;
        }).then(function(){
            console.log("Question Page is Opened");
        }).catch(function(err){
            reject(err);
        })
    })
}

function goToQuestionPage(question){
    return new Promise(function(resolve, reject){
        let qUrlWillBeOpenedPromise = driver.get(question.url);
        qUrlWillBeOpenedPromise.then(function(){
            let payCoinsBtnWillBeSelected = driver.findElement(swd.By.css(".btn.waves-effect.waves-light.col.s4.l1.push-s4.push-l5"))
            return payCoinsBtnWillBeSelected;
            // resolve();
        }).then(function(coinsBtn){
            let coinsWillBePaidPromise = coinsBtn.click();
            return coinsWillBePaidPromise;
        }).then(function(){
            console.log("Coins have been paid.");
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}


// Logic => promise => allow wait overlay dismiss
function overlayWillBeDismissedPromise(){
    return new Promise(function(resolve, reject){
        let siteOverlayWillBeFoundPromise = driver.findElement(swd.By.css("#siteOverlay"));
        siteOverlayWillBeFoundPromise.then(function(soe){
            let willWaitForOverlayPromise = driver.wait(swd.until.elementIsNotVisible(soe));
            return willWaitForOverlayPromise;
        }).then(function(){
            resolve();
        }).catch(function(err){
            rejects(err);
        })
    })
}

console.log("I will be first");