var fs = require("fs");

var list = []; 

var itemDir = "./betaCommands/";
fs.readdirSync(itemDir).forEach(fileName => {
    if(fileName == "index.js" || fileName.includes("example")) return  

    list.push(require("./"+fileName));
})

module.exports = list;