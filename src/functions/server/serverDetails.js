const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$serverDetails",
    version: "1.2.0",
    description: "Gets information about the selected server",
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
            description: "Parameters (allocations,variables)",
            type: ArgType.String,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, include]) {
        return this.successJSON(await request(variable, "GET", "/servers/" + server + (include ? "?include=" + encodeURIComponent(include) : "")));
    }
});