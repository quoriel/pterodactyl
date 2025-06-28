const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$copyFile",
    version: "1.0.0",
    description: "Copies the specified file",
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
            name: "location",
            description: "File path to copy",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, location]) {
        const endpoint = `servers/${server}/files/copy`;
        const body = { location };
        const result = await request(variable, "POST", endpoint, body);
        return this.successJSON(result);
    }
});