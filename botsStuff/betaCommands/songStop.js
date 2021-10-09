const ytSearch = require("yt-search"); 

module.exports = {
    name: "Parar musicas",
    desc: "Working in Progress!",
    get howUse(){ return this.prefix[0] + " Nome da Música, ou " + this.prefix[0] + " Link para a Música" },
    prefix: ["stop", "st"], 
    forServers: ["724575010752299079", "471386976570966036"],
    forRoles: [],
    admin: true,
    func: async (msg) => {
        var channel = msg.voiceChannel

        if(!channel) return msg.reply("você precisa estar em algum canal de voz.");

        channel.leave();
    }
}