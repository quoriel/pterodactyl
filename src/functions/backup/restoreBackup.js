const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request, body } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$restoreBackup",
    version: "1.2.0",
    description: "Restores the server from the selected backup",
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
        },
        {
            name: "truncate",
            description: "Whether to delete existing files before restore (default: true)",
            type: ArgType.Boolean,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, backup, truncate]) {
        return this.successJSON(await request(variable, "POST", "/servers/" + server + "/backups/" + backup + "/restore", body({ truncate })));
    }
});