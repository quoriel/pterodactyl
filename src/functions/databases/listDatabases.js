const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$listDatabases",
    version: "1.0.0",
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
        let endpoint = `servers/${server}/databases`;
        if (include) {
            endpoint += `?include=${encodeURIComponent(include)}`;
        }
        const result = await request(variable, "GET", endpoint);
        return this.successJSON(result);
    }
});