console.clear();
var fs = require("fs");
var bots = require("./bots");
var servers = require("./servers");

bots.forEach(botObj => {    
    var dicord = require("discord.js");
    var bot = new dicord.Client();

    var consoleBotColor = "\x1b[" + (botObj.color || "34");

    console.log("Loading: " + consoleBotColor + botObj.name + "\x1b[0m");
    bot.login(botObj.token);


    bot.on("ready", ()=>{
        console.log(consoleBotColor + bot.user.username + "\x1b[0m is now Online!");
    });

    bot.on("message", msg => {
        // bot doesn't receive commands from it self
        if(bot.user.id == msg.author.id){
            return
        }
        
        var use = {
            raw: msg,
            content: msg.content,
            arg0: msg.content.split(" ")[0],
            get prefix() { return botObj.isCaseSensitive? use.server.prefix: use.server.prefix.toLowerCase() },
            get cmd(){ return msg.content.slice(use.prefix.length).split(" ") },            

            getServer: (server) => {
                var find = servers.find(e => e.id == server.id);
            
                if(find == undefined){
                    server.prefix = botObj.defaultPrefix;
            
                    fs.writeFile("./servers/" + server.name.replace(/\s/g, '') + "_" + server.id + ".json", 
                    JSON.stringify(server, null, '\t'),
                    err => {
                        if(err) throw err
                    });
            
                    find = server;
                }
            
                servers = require("./servers");
                return find
            },
            get saveServer() {
                return () => {
                    var serverFind = use.getServer(use.server);
                
                    fs.writeFile("./servers/" + serverFind.name.replace(/\s/g, '') + "_" + serverFind.id + ".json", 
                    JSON.stringify(serverFind, null, '\t'),
                    err => {
                        if(err) throw err
                    });
            
                    servers = require("./servers");
                }
            },
            getCommands: () => {
                var commandsArr = [];
                botObj.commandsLocaltion.forEach(e => { 
                    commandsArr = commandsArr.concat(require("./"+e)); 
                });
                return commandsArr;
            },

            send: msg.channel.send,
            reply: msg.reply,

            get server(){ return use.getServer(msg.guild) },
            channel: msg.channel,
            user: msg.user
        }
        
        
        // 'with' create a scope where the code can use the object 'use' arguments without calling 'use' everytime
        with(use){
            if((botObj.isCaseSensitive? arg0: arg0.toLowerCase()).startsWith(prefix)){
                var find = getCommands().find(cmdE => {
                    var cmdEl = cmdE.prefix.map(cmdPrefix => botObj.isCaseSensitive? cmdPrefix: cmdPrefix.toLowerCase());
                    var cmdIn =  botObj.isCaseSensitive? cmd[0]: cmd[0].toLowerCase();

                    return cmdEl.includes(cmdIn);
                });

                if(find != undefined){
                    find.func(use);
                } else {
                    reply("Comando não existe")
                }
            }
        }
        

        

        /* var channels = msg.guild.channels.cache
        var t = Array.from(channels.values()).filter(e=>e.type!="category").forEach(e=>console.log(e)); */

    });
});