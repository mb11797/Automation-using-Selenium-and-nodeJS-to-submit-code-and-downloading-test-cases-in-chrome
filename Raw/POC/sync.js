let fs = require("fs");
console.log("Before");
let content = fs.readFileSync("f1.txt", "utf8")
console.log(content);
console.log("After");