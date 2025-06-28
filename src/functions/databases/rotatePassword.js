const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$rotatePassword",
    version: "1.0.0",
    description: "Changes the password of the specified database",
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
            description: "Database identifier",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, database]) {
        const endpoint = `servers/${server}/databases/${database}/rotate-password`;
        const result = await request(variable, "POST", endpoint);
        return this.successJSON(result);
    }
});