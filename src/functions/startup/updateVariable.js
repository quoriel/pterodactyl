const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$updateVariable",
    version: "1.0.0",
    description: "Updates the selected server variable",
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
            name: "key",
            description: "Variable key",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "value",
            description: "Variable value",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, key, value]) {
        const endpoint = `servers/${server}/startup/variable`;
        const body = { key, value };
        const result = await request(variable, "PUT", endpoint, body);
        return this.successJSON(result);
    }
});