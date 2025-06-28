const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$getFileContents",
    version: "1.0.0",
    description: "Returns the contents of the specified file",
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
        }
    ],
    async execute(ctx, [variable, server, file]) {
        const endpoint = `servers/${server}/files/contents?file=${encodeURIComponent(file)}`;
        const result = await request(variable, "GET", endpoint);
        return this.successJSON(result);
    }
});