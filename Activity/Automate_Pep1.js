// npm install -y
// npm install selenium-webdriver
// npm install chromedriver

let fs = require("fs");
let path = require("path");

let credentials = process.argv[2];
let metadata = process.argv[3];
let courseName = process.argv[4];
let un, pn;
let gce;            //global course element 
let gCode;          //global code element
let gCodeArea;      //global code area element for editor
let gTextArea;      //global text area
let gModules;       //global modules
let gLectures;      //global lectures
let gQuestions;     //global questions
// chromedriver
require("chromedriver");

// selenium
let swd = require('selenium-webdriver');
const { resolve } = require("path");
const { rejects } = require("assert");

// builder => browser
let bldr = new swd.Builder();

// driver => 1 tab
let driver = bldr.forBrowser("chrome").build();

// let tabWillBeOpenedPromise = driver.get("https://google.com");
// let tabWillBeOpenedPromise = driver.get("https://pepcoding.com/login");
// tabWillBeOpenedPromise.then(function(){
//     console.log("Tab was successfully opened");
// });

let credentialWillBeReadPromise = fs.promises.readFile(credentials);
credentialWillBeReadPromise.then(function (content) {
    let { userName, password } = JSON.parse(content);
    un = userName;
    pn = password;
    let waitWillBeSetPromise = driver.manage().setTimeouts({
        implicit: 10000
    })
    return waitWillBeSetPromise;
}).then(function () {
    let tabWillBeOpenedPromise = driver.get("https://pepcoding.com/login");
    return tabWillBeOpenedPromise;
}).then(function () {
    console.log("Tab was successfully opened");
}).then(function () {
    //attribute selector => another type of selector
    //first occurences
    let emailWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=email]"));
    let passwordWillBeSelectedPromise = driver.findElement(swd.By.css("input[type=password]"));
    //for parallel work
    let combinedPromise = Promise.all([emailWillBeSelectedPromise, passwordWillBeSelectedPromise]);
    return combinedPromise;
}).then(function (elements) {
    let emailWillBeInputPromise = elements[0].sendKeys(un);
    let passwordWillBeInputPromise = elements[1].sendKeys(pn);
    //for parallel work
    let combinedPromise = Promise.all([emailWillBeInputPromise, passwordWillBeInputPromise]);
    return combinedPromise;
    //wait
}).then(function () {
    console.log("Email and Password are enetered");
}).then(function () {
    let submitBtnWillBeSelectedPromise = driver.findElement(swd.By.css("button[type=submit]"));
    return submitBtnWillBeSelectedPromise;
}).then(function (submitBtn) {
    let submitBtnWillBeClickedPromise = submitBtn.click();
    return submitBtnWillBeClickedPromise;
}).then(function () {
    console.log("User Logged In Successfully.");
}).then(function () {
    let coursePageURLPromise = driver.get("https://www.pepcoding.com/resources/");
    return coursePageURLPromise;
}).then(function () {
    console.log("Opened courses page.");
}).then(overlayWillBeDismissedPromise)
    .then(function () {
        let cardElementWillBeSelectedPromise = driver.findElements(swd.By.css(".card-image h2"));
        return cardElementWillBeSelectedPromise;
    }).then(function (elements) {
        gce = elements;
        //extract name of the courses
        let tPromisesArray = [];
        for (let i = 0; i < elements.length; i++) {
            let elementTextPromise = elements[i].getText();
            tPromisesArray.push(elementTextPromise);
        }
        return Promise.all(tPromisesArray);
    }).then(function (elementsText) {
        let i;
        for (i = 0; i < elementsText.length; i++) {
            if (courseName == elementsText[i]) {
                break;
            }
        }
        let courseWillBeClickedPromise = gce[i].click();
        return courseWillBeClickedPromise;
    }).then(function () {
        console.log("Reached Inside our Course.");
    }).then(function () {
        // read metadata.json file
        let fileReadPromise = fs.promises.readFile(metadata);
        return fileReadPromise;
    }).then(function (content) {
        let questions = JSON.parse(content);
        //the => synchronized
        let questionsWillBeSolvedPromise = solveQuestion(questions[0]);
        for(let i=1; i<questions.length; i++){
            questionsWillBeSolvedPromise = questionsWillBeSolvedPromise.then(function(){
                return solveQuestion(questions[i]);
            })
        }
        return questionsWillBeSolvedPromise;
    }).then(function () {
        console.log("Questions has been submitted.");
    })


    .catch(function (err) {
        console.log(err);
    });

// all then will and catch will be run sequentially

// tabWillBeOpenedPromise.catch(function(err){
//     console.log(err);
// });

// NOTE: JAB BHI THEN KE BAAD THEN KE BAAD THEN CHALANA HOGA TOH HAMESHA EK PROMISE RETURN KARANA HOGA THEN KE ANDAR KE FUNCTION SE

console.log("I will be first");

//ABSTRACTION AND PATIENCE



//problem submit, test case download
function solveQuestion(question) {
    return new Promise(function (resolve, reject) {
        let qPageWillBeOpenedPromise = goToQuestionPage(question);
        qPageWillBeOpenedPromise.then(overlayWillBeDismissedPromise).then(function () {
            let editorTabWillBeSelectedPromise = driver.findElement(swd.By.css(".tab.bold.editorTab"));
            return editorTabWillBeSelectedPromise;
        }).then(function (editorTab) {
            let editorTabWillBeClickedPromise = editorTab.click();
            return editorTabWillBeClickedPromise;
        }).then(function () {
            console.log("Question Page is Opened");
        }).then(function () {
            let fileReadPromise = fs.promises.readFile(path.join(question.path, "Main.java"));
            return fileReadPromise;
        }).then(function (code) {
            gCode = code + "";
            let codeAreaWillBeSelectedPromise = driver.findElement(swd.By.css(".ace_text-input"));
            return codeAreaWillBeSelectedPromise;
        }).then(function (codeArea) {
            gCodeArea = codeArea;
            let ctrlAWillBePressedPromise = codeArea.sendKeys(swd.Key.CONTROL + "a");
            return ctrlAWillBePressedPromise;
        }).then(function () {
            let deleteWillBePressedPromise = gCodeArea.sendKeys(swd.Key.DELETE);
            // let deleteWillBePressedPromise = gCodeArea.sendKeys(swd.Key.BACK_SPACE);
            return deleteWillBePressedPromise;
        }).then(function () {
            let textAreaWillBeSelectedPromise = driver.findElement(swd.By.css("#customInput"));         //id ke liye (#) aur class ke liye (.) use karna hota hai
            return textAreaWillBeSelectedPromise;
        }).then(function (textArea) {
            gTextArea = textArea;
            let codeWillBeSentPromise = gTextArea.sendKeys(gCode);
            return codeWillBeSentPromise;
        }).then(function () {
            let ctrlAWillBePressedPromise = gTextArea.sendKeys(swd.Key.CONTROL + "a");
            return ctrlAWillBePressedPromise;
        }).then(function () {
            let ctrlXPromise = gTextArea.sendKeys(swd.Key.CONTROL + "x");
            return ctrlXPromise;
        }).then(function () {
            let ctrlVPromise = gCodeArea.sendKeys(swd.Key.CONTROL + "v");
            return ctrlVPromise;
        }).then(function () {
            let submitBtnWilBeSelectedPromise = driver.findElement(swd.By.css("#submitCode"));
            return submitBtnWilBeSelectedPromise;
        }).then(function (submitBtn) {
            let submitBtnWillBeClickedPromise = submitBtn.click();
            return submitBtnWillBeClickedPromise;
        }).then(overlayWillBeDismissedPromise)
            .then(function () {
                const testCasesWillBeSelectedPromise = driver.findElements(swd.By.css(".collection-item"));
                return testCasesWillBeSelectedPromise;
                // /test cases download => test cases element => 5
            }).then(function (testCasesElements) {
                let inputsPromises = testCasesElements.map(function (testCaseElement) {
                    return testCaseElement.findElements(swd.By.css("input[type=hidden]"));
                })
                return Promise.all(inputsPromises);
            }).then(function (inputElements) {
                let inputValPromiseArray = inputElements.map(function (ie) {
                    let input = ie[0].getAttribute("value");
                    let expected = ie[1].getAttribute("value");
                    let actual = ie[2].getAttribute("value");
                    // 1 particular => row => 1 Promise
                    return Promise.all([input, expected, actual]);
                })
                //all rows => resolved
                return Promise.all(inputValPromiseArray);
            }).then(function (inputTestCasesVal) {
                // 2d array
                let objArray = inputTestCasesVal.map(function (row) {
                    let obj = {};
                    obj.input = row[0];
                    obj.expected = row[1];
                    obj.actual = row[2];
                    return obj;
                })
                let testCaseFileWillBeWrittenPromise = fs.promises.writeFile(path.join(question.path, "tc.json"), JSON.stringify(objArray));
                return testCaseFileWillBeWrittenPromise;
            })

            // read question from metadata.json file
            // 1. copy the code to editor
            // 2. submit the code
            // 3. download testcases
            .then(function(){
                let p0 = driver.navigate().back();
                for(let i=1; i<4; i++){
                    p0 = p0.then(function(){
                        return driver.navigate().back();
                    })
                }
                return p0;
            }).then(function () {
                resolve();
            })
            .catch(function (err) {
                reject(err);
            })
    })
}

function goToQuestionPage(question) {
    return new Promise(function (resolve, reject) {
        
        let modulesTabWillBeSelectedPromise = driver.wait(swd.until.elementLocated(swd.By.css(".lis.tab")), 5000);
        modulesTabWillBeSelectedPromise.then(function(){
            let AllModulesWillBeSelectedPromise = driver.findElements(swd.By.css(".lis.tab"));
            return AllModulesWillBeSelectedPromise;
        }).then(function (AllModules) {
        //     //findText
        //     gModules = AllModules;
        //     console.log(gModules.length);
        //     let moduleNameArray = AllModules.map(function (module) {
        //         return module.getText();
        //     })
        //     return Promise.all(moduleNameArray);

        //     // let textPromiseArray = [];
        //     // for(let i=0; i<AllModules.length; i++){
        //     //     let moduleTextPromise = AllModules[i].getText();
        //     //     textPromiseArray.push(moduleTextPromise);
        //     // }
        //     // return Promise.all(textPromiseArray);
        // }).then(function (modulesWithText) {
        //     let i;
        //     for (i = 0; i < modulesWithText.length; i++) {
        //         if (modulesWithText[i].includes(question.module)) {
        //             console.log(i);
        //             break;
        //         }
        //     }

        //     let moduleWillBeClickedPromise = gModules[i].click();
        //     return moduleWillBeClickedPromise;
        // })
            console.log("I was here");
            let moduleWillBeClickedPromise = goToQuestionPageHelper(gModules, AllModules, question.module);
            return moduleWillBeClickedPromise;
        }).then(function(){
            console.log("Module clicked");
        }).then(overlayWillBeDismissedPromise)
        .then(function(){
            let lecturesTabWillBeSelectedPromise = driver.wait(swd.until.elementLocated(swd.By.css(".module-details.active li")), 5000);
            return lecturesTabWillBeSelectedPromise;
        }).then(function () {
                let lecturesWillBeSelectedPromise = driver.findElements(swd.By.css(".module-details.active li"));
                return lecturesWillBeSelectedPromise;
            }).then(function (lectureElements) {
            //     gLectures = lectureElements;
            //     console.log(gLectures.length);
            //     let lecturesTextPromise = lectureElements.map(function (lecture) {
            //         return lecture.getText();
            //     })
            //     return Promise.all(lecturesTextPromise);
            // }).then(function (lecturesText) {
            //     let i;
            //     for (i = 0; i < lecturesText.length; i++) {
            //         if (lecturesText[i].includes(question.Lecture)) {
            //             console.log(i);
            //             break;
            //         }
            //     }
            //     let lectureWillBeClickedPromise = gLectures[i].click();
            //     return lectureWillBeClickedPromise;
                let lectureWillBeClickedPromise = goToQuestionPageHelper(gLectures, lectureElements, question.Lecture);
                return lectureWillBeClickedPromise;
            }).then(function(){
                console.log("Lecture clicked");
            }).then(overlayWillBeDismissedPromise)
            .then(function () {
                let questionsWillBeSelectedPromise = driver.findElements(swd.By.css(".collection-item"));
                return questionsWillBeSelectedPromise;
            }).then(function (allQuestions) {
            //     gQuestions = allQuestions;
            //     console.log(gQuestions.length);
            //     let questionsTextPromise = gQuestions.map(function (questionElement) {
            //         return questionElement.getText();
            //     })
            //     return Promise.all(questionsTextPromise);
            // }).then(function (questionsText) {
            //     let i;
            //     for (i = 0; i < questionsText.length; i++) {
            //         if (questionsText[i].includes(question.problem)) {
            //             console.log(i);
            //             break;
            //         }
            //     }
            //     let questionWillBeClickedPromise = gQuestions[i].click();
            //     return questionWillBeClickedPromise;
                let questionWillBeClickedPromise = goToQuestionPageHelper(gQuestions, allQuestions, question.problem);
                return questionWillBeClickedPromise;
            }).then(function(){
                console.log("Question clicked");
            }).then(overlayWillBeDismissedPromise)
            // let qUrlWillBeOpenedPromise = driver.get(question.url);
            // qUrlWillBeOpenedPromise.then(function(){
            //     let payCoinsBtnWillBeSelected = driver.findElement(swd.By.css(".btn.waves-effect.waves-light.col.s4.l1.push-s4.push-l5"))
            //     return payCoinsBtnWillBeSelected;
            //     // resolve();
            // })
            .then(function(){
                let questionsTabWillBeSelectedPromise = driver.wait(swd.until.elementLocated(swd.By.css(".btn.waves-effect.waves-light.col.s4.l1.push-s4.push-l5")), 5000);
                return questionsTabWillBeSelectedPromise;
            }).then(function () {
                let payCoinsBtnWillBeSelected = driver.findElement(swd.By.css(".btn.waves-effect.waves-light.col.s4.l1.push-s4.push-l5"))
                return payCoinsBtnWillBeSelected;
                // resolve();
            })
            .then(function (coinsBtn) {
                let coinsWillBePaidPromise = coinsBtn.click();
                return coinsWillBePaidPromise;
            }).then(function () {
                console.log("Coins have been paid.");
                resolve();
            }).catch(function (err) {
                reject(err);
            })
    })
}

// Logic => promise => allow wait overlay dismiss
function overlayWillBeDismissedPromise() {
    return new Promise(function (resolve, reject) {
        let siteOverlayWillBeFoundPromise = driver.findElement(swd.By.css("#siteOverlay"));
        siteOverlayWillBeFoundPromise.then(function (soe) {
            let willWaitForOverlayPromise = driver.wait(swd.until.elementIsNotVisible(soe));
            return willWaitForOverlayPromise;
        }).then(function () {
            resolve();
        }).catch(function (err) {
            reject(err);
        })
    })
}

function goToQuestionPageHelper(gElements, AllElements, elementName) {
    return new Promise(function(resolve, reject){
    //findText
        console.log("Hey");
        gElements = AllElements;
        console.log(gElements.length);
        let elementsNameArray = AllElements.map(function (element) {
            return element.getText();
        })
        console.log(elementsNameArray.length);
        let allElementsNameArrayPromise = Promise.all(elementsNameArray);
        allElementsNameArrayPromise.then(function (elementsWithText) {
            let i;
            for (i = 0; i < elementsWithText.length; i++) {
                if (elementsWithText[i].includes(elementName)) {
                    console.log(i);
                    break;
                }
            }

            let elementWillBeClickedPromise = gElements[i].click();
            return elementWillBeClickedPromise;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}