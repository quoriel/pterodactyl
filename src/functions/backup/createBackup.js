const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request, body } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$createBackup",
    version: "1.2.0",
    description: "Creates a new server backup",
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
            name: "name",
            description: "Backup name (auto-generated if not provided)",
            type: ArgType.String,
            rest: false
        },
        {
            name: "ignored",
            description: "File patterns to exclude, one per line",
            type: ArgType.String,
            rest: false
        },
        {
            name: "is_locked",
            description: "Whether to lock backup from deletion",
            type: ArgType.Boolean,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, name, ignored, is_locked]) {
        return this.successJSON(await request(variable, "POST", "/servers/" + server + "/backups", body({ name, ignored, is_locked })));
    }
});