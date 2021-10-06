console.clear();


const express = require("express");
const fs = require("fs");


// bots
var exitDelay = 1500;
const bots = require("./bots");
var servers = require("./botsStuff/servers");

const setServerEmbed = require("./botsStuff/minecraftMessage");
var setServerEmbedInterval;

const createAndGetServer = (botObj, server) => {
    var serverDir = "./botsStuff/servers/" + botObj.name + "/"
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

    console.log("Loading: Bot " + consoleBotColor + botObj.name + "\x1b[0m");
    bot.login(botObj.token);

    bot.on("ready", ()=>{
        console.log("Bot " + consoleBotColor + bot.user.username + "\x1b[0m is now Online!");

        if(botObj.onStart != "" && botObj.onStart != undefined){
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
            
                servers = require("./botsStuff/servers");
                return find
            },
            get saveServer() {
                return () => {
                    var serverFind = use.getServer(use.server);
                
                    createAndGetServer(botObj, serverFind);
            
                    servers = require("./botsStuff/servers");
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
        if(botObj.onExit != "" && botObj.onExit != undefined){
            try {
                require("./"+botObj.onExit)(bot);
            } catch {
                console.log("\n\x1b[41m Warning! \x1b[0m\nThe Bot " + consoleBotColor + botObj.name + "\x1b[0m has a \x1b[34monExit\x1b[0m script and has closed before fully loading.\nThis may cause some \x1b[31missues\x1b[0m, so aways close the program pressing 'CTRL+C' in the Command Prompt after the '\x1b[34mmyBotName is now Online\x1b[0m' message appears.\n\x1b[41m Warning! \x1b[0m\n");
            }
        }

        console.log("Killing Bot "+ consoleBotColor + botObj.name + "\x1b[0m" +" Process...");

        setTimeout(() => {
            console.log("\n\x1b[30m\x1b[47m All Process are now Closed. \x1b[0m\n");
            process.exit();
        }, exitDelay * bots.length);
    });
});



// express
var app = express();
var port = 80;

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/");
});

app.listen(port, () => {
    console.log('\x1b[35m %s \x1b[0m', "\nExpress started.");
    var hostname = require('os').hostname();
    require('dns').lookup(hostname, function (err, add, fam) {
        console.log("Ip Link:", '\x1b[36m', 'http://'+ add + (port!=80? ":"+port: "") +"/",'\x1b[0m');
        console.log("Host Name Link:", '\x1b[36m', 'http://'+ hostname + (port!=80? ":"+port: "") +"/",'\x1b[0m');
        console.log("Localhost Link:", '\x1b[36m', 'http://localhost' + (port!=80? ":"+port: "") +"/",'\x1b[0m\n');
    });
});