const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$twoFactorDetails",
    version: "1.2.0",
    description: "Generates TOTP QR code image for setting up two-factor authentication (2FA)",
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
        return this.successJSON(await request(variable, "GET", "/account/two-factor"));
    }
});