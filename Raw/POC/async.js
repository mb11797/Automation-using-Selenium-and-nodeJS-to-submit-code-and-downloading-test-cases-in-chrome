let fs = require("fs");
console.log("Before");

// readFile => sync prog 
let content = fs.readFile("f1.txt", function(err, content){
    if(err){
        console.log("Error: ");
        console.log(err);
    }
    else{
        console.log(content + "");
    }
});
console.log("After");