const ytdl = require("ytdl-core");

module.exports = async (selection, msg) => {
    if(selection == undefined) return msg.reply("índice não esperado, execute o comando novamente.");
    
    var stream = ytdl(selection.url, {filter: "audioonly"})
    msg.musicBot.getUser().connection.play(stream, {
        seek: 0,
        volume: 1,
        quality:"highestaudio",
        options: '-vn',
        highWaterMark: 1<<25,
        before_options: "-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 4"
    })
    .on("finish", () => {
        msg.voiceChannel.leave();
    });

    msg.send("Tocando: "+selection.title)
}