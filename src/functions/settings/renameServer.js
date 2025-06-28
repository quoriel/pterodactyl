const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$renameServer",
    version: "1.0.0",
    description: "Renames the server",
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
            description: "New server name",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, name]) {
        const endpoint = `servers/${server}/settings/rename`;
        const body = { name };
        const result = await request(variable, "POST", endpoint, body);
        return this.successJSON(result);
    }
});