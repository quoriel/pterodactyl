const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$reinstallServer",
    version: "1.0.0",
    description: "Reinstalls the server",
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
        }
    ],
    async execute(ctx, [variable, server]) {
        const endpoint = `servers/${server}/settings/reinstall`;
        const result = await request(variable, "POST", endpoint);
        return this.successJSON(result);
    }
});