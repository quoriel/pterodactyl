const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$compressFile",
    version: "1.2.0",
    description: "Archives the specified file",
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
            name: "files",
            description: "File name for archiving",
            type: ArgType.String,
            required: true,
            rest: true
        }
    ],
    async execute(ctx, [variable, server, root, files]) {
        return this.successJSON(await request(variable, "POST", "/servers/" + server + "/files/compress", JSON.stringify({ root, files })));
    }
});