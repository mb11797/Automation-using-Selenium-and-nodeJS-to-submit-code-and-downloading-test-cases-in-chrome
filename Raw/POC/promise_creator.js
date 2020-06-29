let fs = require("fs");
const { promise } = require("selenium-webdriver");
console.log("Before");

//this is a paradigm => way of thinking
// readFile => async prog using promises
// selenium
function promiseCreator(){
    return new Promise(function(resolve, reject){
        // readFile => sync prog 
        fs.readFile("f1.txt", "utf8", function(err, text){
            if(err){
                // reject => error
                reject(err);
            }
            else{
                // resolve => work completed
                resolve(text);
            }
        });  
    })
}

//code
//1st way:
// promiseCreator().then(function(content){
//     console.log("Promise was resolved.");
//     console.log(content);
// })

// promiseCreator().catch(function(err){
//     console.log("Catch chal gaya.");
//     console.log(err);
// })

//2nd way:
// let fileBeReadPromise = promiseCreator();
// fileBeReadPromise.then(function(content){
//     console.log("Promise was resolved.");
//     console.log(content);
// }).catch(function(err){
//     console.log("Catch chal gaya.");
//     console.log(err);
// })


// let myPromise = promiseCreator();
// //pending
// console.log(myPromise);
// setTimeout(function(){
//     console.log(myPromise);
// }, 3000);


// let myPromise = promiseCreator();
// //pending
// console.log(myPromise);
// setTimeout(function(){
//     console.log(myPromise);
// }, 1);


let myPromise = promiseCreator();
//pending
console.log(myPromise);
setTimeout(function(){
    console.log(myPromise);
}, 2);

// let myPromise = promiseCreator();
// //pending
// console.log(myPromise);
// setTimeout(function(){
//     console.log(myPromise);
// }, 3);