var fs = require("fs");

var list = []; 

var itemDir = "./bots/";
fs.readdirSync(itemDir).forEach(fileName => {
    if(fileName == "index.js" || fileName.includes("example")) return  

    var obj = JSON.parse(fs.readFileSync(itemDir+fileName));

    if(obj.ignore) return

    list.push(obj);
})

module.exports = list;