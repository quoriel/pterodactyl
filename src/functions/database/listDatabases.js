const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$listDatabases",
    version: "1.2.0",
    description: "Returns a list of all server databases",
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
            name: "include",
            description: "Parameters (password)",
            type: ArgType.String,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, include]) {
        return this.successJSON(await request(variable, "GET", "/servers/" + server + "/databases" + (include ? "?include=" + encodeURIComponent(include) : "")));
    }
});