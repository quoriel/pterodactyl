const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$updatePassword",
    version: "1.2.0",
    description: "Updates the account password",
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
            name: "current_password",
            description: "Current user password",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "password",
            description: "New password",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "password_confirmation",
            description: "New password confirmation",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, current_password, password, password_confirmation]) {
        return this.successJSON(await request(variable, "PUT", "/account/password", JSON.stringify({ current_password, password, password_confirmation })));
    }
});