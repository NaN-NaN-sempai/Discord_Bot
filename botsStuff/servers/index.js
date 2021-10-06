var fs = require("fs");

var list = []; 

var itemDir = "./botsStuff/servers/";
fs.readdirSync(itemDir).forEach(folder => {
    if(folder == "index.js") return  

    fs.readdirSync(itemDir + folder).forEach(fileName => { 
        var obj;
    
        try {
            obj = require("./"+fileName);
        } catch {
            obj = {};
        }
    
        list.push(obj);
    });
});

module.exports = list;