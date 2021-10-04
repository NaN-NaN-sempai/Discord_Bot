var fs = require("fs");

var list = []; 

var itemDir = "./servers/";
fs.readdirSync(itemDir).forEach(fileName => {
    if(fileName == "index.js") return  

    var obj = require("./"+fileName);

    list.push(obj);
})

module.exports = list;