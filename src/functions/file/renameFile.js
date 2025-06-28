const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$renameFile",
    version: "1.0.0",
    description: "Renames specified files or folders",
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
            description: "Array of objects to be renamed ({from, to})",
            type: ArgType.Json,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, root, files]) {
        const endpoint = `servers/${server}/files/rename`;
        const body = { root, files };
        const result = await request(variable, "PUT", endpoint, body);
        return this.successJSON(result);
    }
});