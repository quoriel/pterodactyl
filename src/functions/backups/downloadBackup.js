const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$downloadBackup",
    version: "1.0.0",
    description: "Generates a link to download the selected server backup",
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
        const endpoint = `servers/${server}/backups/${backup}/download`;
        const result = await request(variable, "GET", endpoint);
        return this.successJSON(result);
    }
});