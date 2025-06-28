const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$createUser",
    version: "1.0.0",
    description: "Adds a user to the server",
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
            name: "email",
            description: "User email",
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
    async execute(ctx, [variable, server, email, permissions]) {
        const endpoint = `servers/${server}/users`;
        const body = { email, permissions };
        const result = await request(variable, "POST", endpoint, body);
        return this.successJSON(result);
    }
});