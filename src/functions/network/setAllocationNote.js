const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request, body } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$setAllocationNote",
    version: "1.2.0",
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
            description: "Note for the allocation (max 255 characters)",
            type: ArgType.String,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, allocation, notes]) {
        return this.successJSON(await request(variable, "POST", "/servers/" + server + "/network/allocations/" + allocation, body({ notes })));
    }
});