const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$serverDetails",
    version: "1.0.0",
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
            description: "Parameters (egg,subusers)",
            type: ArgType.String,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, include]) {
        let endpoint = `servers/${server}`;
        if (include) {
            endpoint += `?include=${encodeURIComponent(include)}`;
        }
        const result = await request(variable, "GET", endpoint);
        return this.successJSON(result);
    }
});