const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$accountDetails",
    version: "1.0.0",
    description: "Gets account information",
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
        const endpoint = "account";
        const result = await request(variable, "GET", endpoint);
        return this.successJSON(result);
    }
});