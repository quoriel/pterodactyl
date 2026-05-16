const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$backupDetails",
    version: "1.2.0",
    description: "Returns information about the selected server backup",
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
            name: "backup",
            description: "Backup identifier",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, backup]) {
        return this.successJSON(await request(variable, "GET", "/servers/" + server + "/backups/" + backup));
    }
});