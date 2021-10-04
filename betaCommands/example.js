module.exports = {
    name: "My Command Name",
    desc: "My Command Description",
    // show how to use this command, the 'this.prefix[0]' get the prefix used in this command
    get howUse(){ return this.prefix[0] + " my next arguments"},

    // remember to never use the same prefix for more than one command!
    prefix: ["myCommandPrefix", "mcp"], 
    func: (msg) => {
        // My Example Function
    }
};