const ytdl = require("ytdl-core");
const ytSearch = require("yt-search"); 

module.exports = {
    name: "Tcar musica",
    desc: "Working in Progress!",
    get howUse(){ return this.prefix[0] + " novoPrefixo"},
    prefix: ["play"], 
    forRoles: ["896192124008161320"],
    forServers: ["724575010752299079", "471386976570966036"],
    admin: true,
    func: (msg) => {
        var channel = msg.voiceChannel

        console.log("entrou");

        if(!channel){
            msg.reply("desculpe, você precisa estar em algum canal de voz.");
        }
    }
}