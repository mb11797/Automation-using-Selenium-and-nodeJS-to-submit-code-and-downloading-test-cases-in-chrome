let fs = require("fs");
console.log("Before");
//promise => js does not wait for promises, wo aage badh jaati hai, jiska result aage aa jayega.
let fileReadPromise = fs.promises.readFile("f11.txt", "utf8");
//fulfill
fileReadPromise.then(function(content){
    console.log(content);
});
//reject
fileReadPromise.catch(function(err){
    // console.log(err);
    console.log("Some Error");
});
// then and catch must always be in same order
console.log("After");