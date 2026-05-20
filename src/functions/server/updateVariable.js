const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$updateVariable",
    version: "1.2.0",
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
        return this.successJSON(await request(variable, "PUT", "/servers/" + server + "/startup/variable", JSON.stringify({ key, value })));
    }
});