const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$setAllocationNote",
    version: "1.0.0",
    description: "Sets a note for the allocation",
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
        },
        {
            name: "notes",
            description: "Note for the allocation",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, allocation, notes]) {
        const endpoint = `servers/${server}/network/allocations/${allocation}`;
        const body = { notes };
        const result = await request(variable, "POST", endpoint, body);
        return this.successJSON(result);
    }
});