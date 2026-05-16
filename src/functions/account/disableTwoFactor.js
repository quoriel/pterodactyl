const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$disableTwoFactor",
    version: "1.2.0",
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
        return this.successJSON(await request(variable, "POST", "/account/two-factor/disable", JSON.stringify({ password })));
    }
});