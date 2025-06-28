const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$writeFile",
    version: "1.0.0",
    description: "Writes data to the specified file",
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
            name: "file",
            description: "File path",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "content",
            description: "Data to be recorded",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, file, content]) {
        const endpoint = `servers/${server}/files/write?file=${encodeURIComponent(file)}`;
        const result = await request(variable, "POST", endpoint, content);
        return this.successJSON(result);
    }
});