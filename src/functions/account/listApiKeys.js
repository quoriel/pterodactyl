const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$listApiKeys",
    version: "1.0.0",
    description: "Returns a list of API keys",
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
        }
    ],
    async execute(ctx, [variable]) {
        const endpoint = "account/api-keys";
        const result = await request(variable, "GET", endpoint);
        return this.successJSON(result);
    }
});