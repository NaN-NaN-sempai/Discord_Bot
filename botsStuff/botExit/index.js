
module.exports = (bot) => {
    var embed = {
        "content": "<:CirculoPreto:895182445618561085> **Bot Desligado**",
        "embed": {
            "title": "**Servidor de Minecraft Bedrock**",
            "description": "Nós do **{NWS} Neverwinter SENAI e amigos** disponibilizamos um server de **Minecraft Bedrock** para os **` @interno `** do grupo.\n*Esta mensagem mostra o **Status do Servidor** em **tempo real**.*",
            "color": 1,
            "timestamp": new Date(),
            "fields": [
                {
                    "name": "Desculpe, o Bot *{NWS}* esta Desligado, então não é possivel checar o *Status do Servidor de Minecraft* no momento.",
                    "value": "Quando o *Bot* ficar Online, ele mostrará o **Status do Servidor** novamente."
                },
                {
                    "name": "Status:",
                    "value": "<:CirculoPreto:895182445618561085> **Bot Desligado**"
                },
                {
                    "name": "Nome:",
                    "value": "{NWS} Server"
                },
                {
                    "name": "Entrar no server: ",
                    "value": "Para entrar no servidor, você precisa estar na nossa **Rede Virtual**. Para entrar, siga os passos **[neste link](https://discord.com/channels/471386976570966036/846097860525031444/846098113348894740)**.\nApós ter entrado, Siga os passos **[deste link](https://discord.com/channels/471386976570966036/846102300941484073/846105016628150272)** para entrar no **Servidor de Minecraft**."
                },
                {
                    "name": "⠀",
                    "value": "**Bot a mimir...**"
                }
            ],
            "footer": {
                "icon_url": bot.user.displayAvatarURL(),
                "text": "{NWS} Neverwinter SENAI e amigos  •  {NWS} Server"
            },
            "image": {
              "url": "https://c.tenor.com/pxJes7QdiSEAAAAC/optimus-prime-death.gif"
            },
            "thumbnail": {
                "url": "https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png"
            }
        }
    }

    clearInterval(bot["____nwsHV"].setServerEmbedInterval);

    bot["____nwsHV"].setServerEmbed(bot, false, {}, embed);
}