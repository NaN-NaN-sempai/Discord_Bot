module.exports = {
    name: "My Command Name",
    desc: "My Command Description",

    // show how to use this command, the 'this.prefix[0]' get the prefix used in this command
    get howUse(){ return this.prefix[0] + " my next arguments"},

    // remember to never use the same prefix for more than one command!
    prefix: ["myCommandPrefix", "mcp"],

    // commands for expecific serverss, use the server id, if user is in another server the command will not exist for this user
    forServers: ["server Id Here" /* you can block comment here */, "000000000000000001" /* <= my Server 1 Name */, "000000000000000002" /* <= my Server 2 Name */],
    
    // commands for expecific roles, use the role id, if user does'nt any of these roles, the commands will not exist for this user
    forRoles: ["role Id Here" /* you can block comment here */, "000000000000000001" /* <= my Role 1 Name */, "000000000000000002" /* <= my Role 2 Name */],

    // if user needs admin permission 
    admin: true,

    // the function that the command will execute, note that the 'msg' used in the function is the 'use' object from the index.js file
    // to access the 'msg' from discord, use: 'msg.raw'
    // example: msg.raw.member.roles.cache for the roles
    func: (msg) => {
        // My Example Function
    }
};