const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request, body } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$assignAllocation",
    version: "1.2.0",
    description: "Assigns a new allocation to the server (auto-assigns if ip and port are not specified)",
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
            name: "ip",
            description: "Specific IP address to assign",
            type: ArgType.String,
            rest: false
        },
        {
            name: "port",
            description: "Specific port to assign",
            type: ArgType.Number,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, ip, port]) {
        return this.successJSON(await request(variable, "POST", "/servers/" + server + "/network/allocations", body({ ip, port })));
    }
});