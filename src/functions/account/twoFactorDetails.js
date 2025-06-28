const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$twoFactorDetails",
    version: "1.0.0",
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
        const endpoint = "account/two-factor";
        const result = await request(variable, "GET", endpoint);
        return this.successJSON(result);
    }
});