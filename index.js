console.clear();
var fs = require("fs");
const { type } = require("os");
const cmdObj = require("./betaCommands/example");
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
            args: msg.content.split(" "),
            get cmd(){ return msg.content.replace(use.server.prefix, "").split(" ") },            

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
        
        
        // create a scope where the code can use the 'use' object arguments without calling 'use' everytime
        with(use){
            if(args[0].startsWith(server.prefix)){
                var find = getCommands().find(cmdE => cmdE.prefix == cmd[0]);

                if(find != undefined){
                    find.func(use);
                } else {
                    reply("Commando n existe")
                }
            }
        }
        

        

        /* var channels = msg.guild.channels.cache
        var t = Array.from(channels.values()).filter(e=>e.type!="category").forEach(e=>console.log(e)); */

    });
});