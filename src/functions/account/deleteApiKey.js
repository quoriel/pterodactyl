const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$deleteApiKey",
    version: "1.2.0",
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
        return this.successJSON(await request(variable, "DELETE", "/account/api-keys/" + identifier));
    }
});