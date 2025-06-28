const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$deleteApiKey",
    version: "1.0.0",
    description: "Deletes the specified API key",
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
            name: "identifier",
            description: "API key identifier",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, identifier]) {
        const endpoint = `account/api-keys/${identifier}`;
        const result = await request(variable, "DELETE", endpoint);
        return this.successJSON(result);
    }
});