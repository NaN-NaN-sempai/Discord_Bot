var itemDir = "./botsStuff/commandsBeta/";

var fs = require("fs");

module.exports = () => {
    var list = []; 

    fs.readdirSync(itemDir).forEach(fileName => {
        if(fileName == "index.js" || fileName.includes("example")) return  

        list.push(require("./"+fileName));
    });

    return list;
};