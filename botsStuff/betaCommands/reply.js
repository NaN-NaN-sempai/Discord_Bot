module.exports = {
    name: "Falar",
    desc: "Repetir oque esta escrito em uma mensagem.",
    get howUse(){ return this.prefix[0] + " meu texto para ser falado."},
    prefix: ["responder", "reply"], 
    forRoles: ["724580043019255808"],
    func: (msg) => {
        var input = msg.content.slice(msg.arg0.length + 1);

        if(!input) return
        
        if(input.includes("removerMensagem")){
            msg.raw.delete();

            input = input.replace(new RegExp("removerMensagem", "g"), "");
        }

        msg.reply(input);
    }
}