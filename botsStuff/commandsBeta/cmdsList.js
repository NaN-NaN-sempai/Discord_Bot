module.exports = {
    name: "Listar comandos",
    desc: "Mostra a lista de comandos",
    get howUse(){ return this.prefix[0] + ""},
    prefix: ["comandos", "cmds"],
    forServers: [],
    forRoles: [],
    admin: false,
    func: (msg) => {
        var cmdList = msg.getCommands();

        var normalCmds = cmdList.filter(e => !e.admin);
        var forAdmins = cmdList.filter(e => e.admin);

        var formatCmdList = arr => {
            var retS = ""; 
            arr.forEach((e, i) => {
                retS += "**` " + msg.prefix + e.prefix[0] + " `" + " (*" + e.name + "*)**" + (i == arr.length-1? ".": ",\n");
            })
            return retS;
        }

        msg.reply("aqui está, a lista!\n\n>>> ***Comandos*:**\n"+formatCmdList(normalCmds)+(msg.hasAdmin?"\n\n***Para Administradores*:**\n"+formatCmdList(forAdmins):"")+"\n⠀");
        msg.send("Use **` "+msg.prefix+"help comando `** caso tenha duvida de como usar algum comando, você vai receber uma explicação de como usar este comando e oque ele faz.");
    }
};