const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request, body } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$createApiKey",
    version: "1.2.0",
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
        return this.successJSON(await request(variable, "POST", "/account/api-keys", body({ description, allowed_ips })));
    }
});