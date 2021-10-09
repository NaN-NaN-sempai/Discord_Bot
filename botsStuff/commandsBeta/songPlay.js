const ytSearch = require("yt-search"); 

module.exports = {
    name: "Tocar musicas",
    desc: "Working in Progress!",
    get howUse(){ return this.prefix[0] + " Nome da Música, ou " + this.prefix[0] + " Link para a Música" },
    prefix: ["play", "p"], 
    forServers: ["724575010752299079", "471386976570966036"],
    forRoles: [],
    admin: false,
    func: async (msg) => {
        var channel = msg.voiceChannel

        if(!channel) return msg.reply("você precisa estar em algum canal de voz.");

        var permissions = channel.permissionsFor(msg.raw.client.user);
        if(!permissions.has("CONNECT")) return msg.reply("sem permissão para conectar.");
        if(!permissions.has("SEPAK")) return msg.reply("sem permissão para falar.");

        if(msg.args.length == 1) return msg.reply("por favor, insira algum argumento.");

        var loadingMsg = await msg.send("Carregando lista...");

        const videoFind = async (query) => {
            var videoResult = await ytSearch(query);

            return videoResult;
        }

        var input = msg.content.slice(msg.arg0.length + 1);
        var list = (await videoFind(input)).videos;

        var userFind = msg.musicBot.getUser();

        userFind.choosingSong = true;
        userFind.choosingSongList = list;
        userFind.connection = await msg.voiceChannel.join();

        var showList = arr => {
            var retS = "";
            arr.forEach((e, i) => {
                retS += "**" + i + "**: "+ e.title + (i == arr.length-1? ".": ",\n");
            })
            return retS;
        }

        msg.send("Digíte o **numero** do video no chat: \n\n>>> "+showList(userFind.choosingSongList)+"\n⠀");
        loadingMsg.delete();
    }
}