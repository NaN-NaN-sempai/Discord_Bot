module.exports = {
    name: "My Command Name",
    desc: "My Command Description",
    get howUse(){ return this.prefix[0] + " my next arguments"},
    prefix: ["myCommandPrefix", "mcp"],
    forServers: [],
    forRoles: [],
    admin: true,
    func: (msg) => {
        
    }
};