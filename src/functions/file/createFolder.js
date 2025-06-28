const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$createFolder",
    version: "1.0.0",
    description: "Creates the specified folder in the selected directory",
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
            name: "root",
            description: "Root directory",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "name",
            description: "Name of the folder to be created",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, root, name]) {
        const endpoint = `servers/${server}/files/create-folder`;
        const body = { root, name };
        const result = await request(variable, "POST", endpoint, body);
        return this.successJSON(result);
    }
});