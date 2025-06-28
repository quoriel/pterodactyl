const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$updateUser",
    version: "1.0.0",
    description: "Updates the selected server user",
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
            name: "user",
            description: "User identifier",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "permissions",
            description: "User permissions",
            type: ArgType.String,
            required: true,
            rest: true
        }
    ],
    async execute(ctx, [variable, server, user, permissions]) {
        const endpoint = `servers/${server}/users/${user}`;
        const body = { permissions };
        const result = await request(variable, "POST", endpoint, body);
        return this.successJSON(result);
    }
});