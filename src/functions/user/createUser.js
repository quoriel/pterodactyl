const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$createUser",
    version: "1.2.0",
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
        return this.successJSON(await request(variable, "POST", "/servers/" + server + "/users", JSON.stringify({ email, permissions })));
    }
});