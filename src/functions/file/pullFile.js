const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request, body } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$pullFile",
    version: "1.2.0",
    description: "Downloads a file from a remote URL directly to the server",
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
            name: "url",
            description: "URL of the file to download",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "directory",
            description: "Directory to save the file into",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "filename",
            description: "Custom filename to save as",
            type: ArgType.String,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, url, directory, filename]) {
        return this.successJSON(await request(variable, "POST", "/servers/" + server + "/files/pull", body({ url, directory, filename })));
    }
});