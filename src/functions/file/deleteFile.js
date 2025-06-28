const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$deleteFile",
    version: "1.0.0",
    description: "Deletes specified files or folders",
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
            description: "Names of files or folders to delete",
            type: ArgType.String,
            required: true,
            rest: true
        }
    ],
    async execute(ctx, [variable, server, root, files]) {
        const endpoint = `servers/${server}/files/delete`;
        const body = { root, files };
        const result = await request(variable, "POST", endpoint, body);
        return this.successJSON(result);
    }
});