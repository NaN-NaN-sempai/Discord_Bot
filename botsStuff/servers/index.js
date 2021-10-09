var itemDir = "./botsStuff/servers/";

var fs = require("fs"); 

module.exports = () => {
    var list = []; 

    fs.readdirSync(itemDir).forEach(folder => {
        if(folder == "index.js") return  

        fs.readdirSync(itemDir + folder).forEach(fileName => { 
            var obj;
            try {
                obj = require("./" + folder + "/" + fileName);
            } catch (e){
                obj = {};
            }
        
            list.push(obj);
        });
    });

    return list;
};