console.clear();

var exitDelay = 2000;

const fs = require("fs");
const bots = require("./bots");
var servers = require("./servers");

const setServerEmbed = require("./minecraftMessage/");
var setServerEmbedInterval;

const createAndGetServer = (botObj, server) => {
    var serverDir = "./servers/" + botObj.name + "/"
    var serverFileName = server.name.replace(/\s/g, '') + "_" + server.id + ".json";

    if (!fs.existsSync(serverDir)) {
        fs.mkdirSync(serverDir);
    }

    fs.writeFile(serverDir + serverFileName, 
    JSON.stringify(server, null, '\t'),
    err => {
        if(err) throw err
    });
}

bots.forEach(botObj => {    
    var dicord = require("discord.js");
    var bot = new dicord.Client();

    bot["____nwsHV"] = {
        setServerEmbed,
        get setServerEmbedInterval() { return setServerEmbedInterval }
    }

    var consoleBotColor = "\x1b[" + (botObj.color || "34");

    console.log("Loading: " + consoleBotColor + botObj.name + "\x1b[0m");
    bot.login(botObj.token);

    bot.on("ready", ()=>{
        console.log(consoleBotColor + bot.user.username + "\x1b[0m is now Online!");

        if(botObj.onStart != "" || botObj.onStart != undefined){
            setServerEmbedInterval = require("./"+botObj.onStart)(bot);
        }
    });

    bot.on("message", msg => {
        // bot doesn't receive commands from it self
        if(bot.user.id == msg.author.id) return
        
        var use = {
            raw: msg,
            content: msg.content,
            arg0: msg.content.split(" ")[0],
            get prefix() { return botObj.isCaseSensitive? use.server.prefix: use.server.prefix.toLowerCase() },
            get args(){ return msg.content.split(" ") },     
            get cmd(){ return msg.content.slice(use.prefix.length).split(" ") },            

            getServer: (server) => {
                var find = servers.find(e => e.id == server.id);
            
                if(find == undefined){
                    server.prefix = botObj.defaultPrefix;

                    createAndGetServer(botObj, server);

                    find = server;
                }
            
                servers = require("./servers");
                return find
            },
            get saveServer() {
                return () => {
                    var serverFind = use.getServer(use.server);
                
                    createAndGetServer(botObj, serverFind);
            
                    servers = require("./servers");
                }
            },
            getCommands: () => {
                var commandsArr = [];
                botObj.commandsLocaltion.forEach(e => { 
                    commandsArr = commandsArr.concat(require("./"+e)()); 
                });
                return commandsArr;
            },

            send: str => msg.channel.send(str),
            reply: msg.reply,

            get server(){ return use.getServer(msg.guild) },
            channel: msg.channel,
            user: msg.author,
            member: msg.member,
            roles: msg.member.roles.cache
        }

        // create a scope where the code can use the 'use' object arguments without calling 'use' everytime
        with(use){
            if((botObj.isCaseSensitive? arg0: arg0.toLowerCase()).startsWith(prefix)){
                var find = getCommands().find(cmdE => {
                    var cmdEl = cmdE.prefix.map(cmdPrefix => botObj.isCaseSensitive? cmdPrefix: cmdPrefix.toLowerCase());
                    var cmdIn =  botObj.isCaseSensitive? cmd[0]: cmd[0].toLowerCase(); 

                    return cmdEl.includes(cmdIn);
                });

                if(find != undefined){
                    if(find.forRoles.length){
                        if(roles.find(role => find.forRoles.includes(role.id))){
                            find.func(use);
                            
                        } else {
                            reply("Desculpe, você não tem a permissão necessária para usar este comando.");

                        }
                    } else {
                        find.func(use);

                    }
                } else {
                    reply("Este comando não existe.");

                }
            }
        }
        /* var channels = msg.guild.channels.cache
        var t = Array.from(channels.values()).filter(e=>e.type!="category").forEach(e=>console.log(e)); */

    });

    process.on('SIGINT', function() {
        if(botObj.onExit != "" || botObj.onExit != undefined){
            require("./"+botObj.onExit)(bot)
        }

        console.log("Closing Process...");
        setTimeout(() => {
            console.log(("Process Closed."));
            process.exit();
        }, exitDelay);
    });
});