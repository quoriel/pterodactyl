const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request, body } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$renameServer",
    version: "1.2.0",
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
        },
        {
            name: "description",
            description: "New server description",
            type: ArgType.String,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, name, description]) {
        return this.successJSON(await request(variable, "POST", "/servers/" + server + "/settings/rename", body({ name, description })));
    }
});