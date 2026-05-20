const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$createDatabase",
    version: "1.2.0",
    description: "Creates a new database on the server",
    output: ArgType.Json,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "variable",
            description: "Configuration variable name",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "server",
            description: "Server identifier",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "database",
            description: "Database Name",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "remote",
            description: "Remote (for example, %)",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, database, remote]) {
        return this.successJSON(await request(variable, "POST", "/servers/" + server + "/databases", JSON.stringify({ database, remote })));
    }
});