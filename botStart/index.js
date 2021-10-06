const util = require('minecraft-server-util');
const setServerEmbed = require("../minecraftMessage/");

const setStatusFunction = (bot) => {
    util.statusBedrock('nws-server').then((response) => {
        setServerEmbed(bot, true, response);
        
    }).catch(() => {
        setServerEmbed(bot, false);
    });
}

module.exports = (bot) => {
    setStatusFunction(bot);

    return setInterval(() => {
        setStatusFunction(bot);
    }, 10000);
}