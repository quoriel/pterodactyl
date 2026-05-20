const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$toggleBackupLock",
    version: "1.2.0",
    description: "Toggles the lock state of the selected backup (locked backups cannot be deleted)",
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
        return this.successJSON(await request(variable, "POST", "/servers/" + server + "/backups/" + backup + "/lock"));
    }
});