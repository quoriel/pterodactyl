const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$setPrimaryAllocation",
    version: "1.0.0",
    description: "Sets the main allocation",
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
            name: "allocation",
            description: "Allocation identifier",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, allocation]) {
        const endpoint = `servers/${server}/network/allocations/${allocation}/primary`;
        const result = await request(variable, "POST", endpoint);
        return this.successJSON(result);
    }
});