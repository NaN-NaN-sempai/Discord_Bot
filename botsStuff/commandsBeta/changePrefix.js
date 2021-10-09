module.exports = {
    name: "Mudar Prefixo",
    desc: "Muda o prefixo de utilização deste servidor.",
    get howUse(){ return this.prefix[0] + " novoPrefixo"},
    prefix: ["prefix"], 
    forServers: [],
    forRoles: [], 
    admin: true,
    func: (msg) => {
        msg.server.prefix = "tete";
        msg.saveServer();
        msg.reply("prefixo é tete");
    }
}