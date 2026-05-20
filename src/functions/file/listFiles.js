const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$listFiles",
    version: "1.2.0",
    description: "Returns a list of all server files",
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
            name: "directory",
            description: "Directory path",
            type: ArgType.String,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, directory]) {
        return this.successJSON(await request(variable, "GET", "/servers/" + server + "/files/list" + (directory ? "?directory=" + encodeURIComponent(directory) : "")));
    }
});