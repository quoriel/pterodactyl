const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$createApiKey",
    version: "1.0.0",
    description: "Generates a new API key",
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
            name: "description",
            description: "Description for API key",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "allowed_ips",
            description: "List of allowed IP addresses",
            type: ArgType.String,
            rest: true
        }
    ],
    async execute(ctx, [variable, description, allowed_ips]) {
        const endpoint = "account/api-keys";
        const body = { description };
        if (allowed_ips) body.allowed_ips = allowed_ips;
        const result = await request(variable, "POST", endpoint, body);
        return this.successJSON(result);
    }
});