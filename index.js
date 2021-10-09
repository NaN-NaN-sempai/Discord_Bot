console.clear();

/* 
download ffmpeg in: https://www.gyan.dev/ffmpeg/builds/#git-master-builds

ffmpeg in C:\ffmpeg\bin

in terminal: npm install @discordjs/opus ffmpeg-static yt-search ytdl-core 
*/


const express = require("express");
const fs = require("fs");


// bots
var exitDelay = 1000;
const bots = require("./bots");
var servers = require("./botsStuff/servers")();
const playSong = require("./botsStuff/playSong");

const setServerEmbed = require("./botsStuff/minecraftMessage");
var setServerEmbedInterval;

const createAndGetServer = (botObj, server) => {
    var serverDir = "./botsStuff/servers/" + botObj.name + "/"
    var serverFileName = server.name.replace(/\s/g, '') + "_" + server.id + ".json";

    if (!fs.existsSync(serverDir)) {
        fs.mkdirSync(serverDir);
    }
    
    var serverCopy = Object.assign({}, server);
    serverCopy.musicBot.users.forEach(u => {
        u.choosingSong = false;
        u.choosingSongList = [];
        delete u.connection;
    })
    delete serverCopy.toJSON; 

    fs.writeFile(serverDir + serverFileName, 
                JSON.stringify(serverCopy, null, '\t'),
                () => { // error catcher
                    JSON.stringify({}, null, '\t')
                });
}

var co = 0

const discord = require("discord.js");
bots.forEach(botObj => {    
    var bot = new discord.Client();

    bot["____nwsHV"] = {
        setServerEmbed,
        get setServerEmbedInterval() { return setServerEmbedInterval }
    }

    var consoleBotColor = "\x1b[" + (botObj.color || "34");

    console.log("Loading: Bot " + consoleBotColor + botObj.name + "\x1b[0m...");
    bot.login(botObj.token);

    bot.on("ready", ()=>{
        console.log("Bot " + consoleBotColor + bot.user.username + "\x1b[0m is now Online!");

        if(botObj.onStart != "" && botObj.onStart != undefined){
            setServerEmbedInterval = require("./"+botObj.onStart)(bot);
        }
    });

    bot.on("message", msg => {
        // bot doesn't receive commands from it self or others bots
        if(bot.user.id == msg.author.id || msg.author.bot) return
        
        var use = {
            raw: msg,
            content: msg.content,
            arg0: msg.content.split(" ")[0],
            get prefix() { return use.server.prefix },
            get args(){ return msg.content.split(" ") },     
            get cmd(){ return msg.content.slice(use.prefix.length).split(" ") },    
            
            bot,
            botObj,

            getServer: (server) => {
                var find = servers.find(e => e.botIdentificator == botObj.token && e.id == msg.guild.id);
            
                if(find == undefined){
                    server.botIdentificator = botObj.token;
                    server.prefix = botObj.defaultPrefix;
                    server.musicBot = {
                        now: undefined,
                        query: [],
                        loop: false,

                        users: []
                    }

                    createAndGetServer(botObj, server);
                    find = server;
                }

                servers = require("./botsStuff/servers")();
                return find
            },
            get saveServer() {
                return () => {
                    var serverFind = use.getServer(use.server);
                
                    createAndGetServer(botObj, serverFind);
            
                    servers = require("./botsStuff/servers")();
                }
            },
            get getCommands() {
                return (filter = true) => {
                    var commandsArr = [];
                    botObj.commandsLocaltion.forEach(dirName => { 
                        var commandsList = require("./"+dirName)();
                        
                        commandsList.forEach(c => {
                            var serverFilter = c.forServers.includes(use.server.id) || !c.forServers.length;
                            var roleFilter = use.roles.find(role => c.forRoles.includes(role.id)) || !c.forRoles.length;

                            if(serverFilter){
                                if(!filter || use.hasAdmin){
                                    commandsArr.push(c); 
                                } else {
                                    if(roleFilter){
                                        commandsArr.push(c); 
                                    }  
                                }
                            }                            
                        })
                    });
                    return commandsArr;
                }
            },

            get musicBot() { 
                return {
                    getUser: () => {
                        var userFind = use.server.musicBot.users.find(u => u.id == use.user.id);
                        
                        if(!userFind){
                            var userList = use.server.musicBot.users;
                            userList.push({
                                id: use.user.id,
                                choosingSong: false,
                                choosingSongList: []
                            });

                            use.server.musicBot.users = userList;
                            userFind = use.server.musicBot.users.find(u => u.id == use.user.id);
                            use.saveServer(use.server); 
                        }

                        return userFind;
                    }
                }
            },

            send: str => msg.channel.send(str),
            reply: msg.reply,

            get server(){ return use.getServer(msg.guild) },
            channel: msg.channel,
            voiceChannel: msg.member.voice.channel,
            user: msg.author,
            member: msg.member,
            roles: msg.member.roles.cache,
            
            get hasAdmin() { return use.member.hasPermission("ADMINISTRATOR") }
        }

        // 'with' creates a scope where the code can use the 'use' object arguments without calling 'use' everytime
        with(use){
            var doCaseSen = s => botObj.isCaseSensitive? s: s.toLowerCase();
            if(musicBot.getUser()?.choosingSong){
                var songIndex = parseFloat(content);
                if(!isNaN(songIndex)){
                    playSong(musicBot.getUser().choosingSongList[songIndex], use);
                } else {
                    reply("o numero escolhendo o indice do vídeo era esperado, execure o comando novamente.");
                }

                musicBot.getUser().choosingSong = false;
                musicBot.getUser().choosingSongList = [];
                saveServer();
                return;
            }

            if((doCaseSen(arg0)).startsWith(doCaseSen(prefix))){
                var find = getCommands(false).find(cmdE => {
                    var cmdEl = cmdE.prefix.map(cmdPrefix => doCaseSen(cmdPrefix));
                    var cmdIn =  doCaseSen(cmd[0]); 

                    return cmdEl.includes(cmdIn);
                });


                if(find != undefined){
                    if(roles.find(role => find.forRoles.includes(role.id)) || !find.forRoles.length){
                        if(find.admin){
                            if(hasAdmin){
                                find.func(use);
                            } else {
                                // user has no admin
                                reply("desculpe, você não tem a permissão necessária para usar este comando.");
                            }
                        } else {
                            find.func(use);
                        }
                        
                    } else {
                        // user doesn't have the necessary role
                        reply("desculpe, você não tem a permissão necessária para usar este comando.");

                    }
                } else {
                    // unrecognized command
                    reply("desculpe, este comando não existe.");

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
                console.log("\n\x1b[41m Warning! \x1b[0m\nThe Bot " + consoleBotColor + botObj.name + "\x1b[0m has a \x1b[34monExit\x1b[0m script and has closed before fully loading.\nThis may cause some \x1b[31missues\x1b[0m, so aways close the program pressing 'CTRL+C' in the Command Prompt after the 'Bot \x1b[34mmyBotName is now Online\x1b[0m' message appears.\n\x1b[41m Warning! \x1b[0m\n");
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