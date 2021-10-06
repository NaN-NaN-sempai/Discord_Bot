const channelId = "850068981498380308";
const messageId = "895149609222045736";

module.exports = (bot, setState, response, myEmbed) => {
    var embed;

    if(setState){
        embed = {
            "content": ":green_circle: **Online**",
            "embed": {
                "title": "**Servidor de Minecraft Bedrock**",
                "description": "Nós do **{NWS} Neverwinter SENAI e amigos** disponibilizamos um server de **Minecraft Bedrock** para os `@interno` do grupo.\nEsta mensagem mostra o **Status do Servidor** em tempo real.",
                "color": 5673997,
                "timestamp": new Date(),
                "fields": [
                    {
                        "name": "Status:",
                        "value": ":green_circle: **Online**"
                    },
                    {
                        "name": "Nome:",
                        "value": "{NWS} Server"
                    },
                    {
                        "name": "Versão:",
                        "value": response.version
                    },
                    {
                        "name": "Capacidade:",
                        "value": response.maxPlayers,
                        "inline": true
                    },
                    {
                        "name": "Online agora:",
                        "value": response.onlinePlayers,
                        "inline": true
                    },
                    {
                        "name": "⠀",
                        "value": "⠀",
                        "inline": true
                    },
                    {
                        "name": "Gamemode:",
                        "value": response.gameMode + "\n "
                    },
                    {
                        "name": "Entrar no server: ",
                        "value": "Para entrar no servidor, você precisa estar na nossa **Rede Virtual**. Para entrar, siga os passos **[neste link](https://discord.com/channels/471386976570966036/846097860525031444/846098113348894740)**.\nApós ter entrado, Siga os passos **[deste link](https://discord.com/channels/471386976570966036/846102300941484073/846105016628150272)** para entrar no **Servidor de Minecraft**."
                    }
                ],
                "thumbnail": {
                    "url": "https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png"
                },
                "footer": {
                    "icon_url": bot.user.displayAvatarURL(),
                    "text": "{NWS} Neverwinter SENAI e amigo  •  {NWS} Server"
                }
            },
        }
    } else {
        embed = {
            "content": ":red_circle: **Offline**",
            "embed": {
                "title": "**Servidor de Minecraft Bedrock**",
                "description": "Nós do **{NWS} Neverwinter SENAI e amigos** disponibilizamos um server de **Minecraft Bedrock** para os `@interno` do grupo.\nEsta mensagem mostra o **Status do Servidor** em tempo real.",
                "color": 13959168,
                "timestamp": new Date(),
                "fields": [
                    {
                        "name": "Desculpe, parece que o Servidor esta **Offline**.",
                        "value": "⠀"
                    },
                    {
                        "name": "Status:",
                        "value": ":red_circle: **Offline**"
                    },
                    {
                        "name": "Nome:",
                        "value": "{NWS} Server"
                    },
                    {
                        "name": "Entrar no server: ",
                        "value": "Para entrar no servidor, você precisa estar na nossa **Rede Virtual**. Para entrar, siga os passos **[neste link](https://discord.com/channels/471386976570966036/846097860525031444/846098113348894740)**.\nApós ter entrado, Siga os passos **[deste link](https://discord.com/channels/471386976570966036/846102300941484073/846105016628150272)** para entrar no **Servidor de Minecraft**."
                    }
                ],
                "footer": {
                    "icon_url": bot.user.displayAvatarURL(),
                    "text": "{NWS} Neverwinter SENAI e amigo  •  {NWS} Server"
                },
                "thumbnail": {
                    "url": "https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png"
                }
            }
        }
    }

    bot.channels.resolve(channelId).messages.fetch({ around: messageId, limit: 1 }).then(async msg => {
        msg.first().edit(myEmbed || embed);
    });
}