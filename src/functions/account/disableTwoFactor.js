const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$disableTwoFactor",
    version: "1.0.0",
    description: "Disables TOTP two-factor authentication on the account",
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
            name: "password",
            description: "Current user password",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, password]) {
        const endpoint = "account/two-factor";
        const body = { password };
        const result = await request(variable, "DELETE", endpoint, body);
        return this.successJSON(result);
    }
});