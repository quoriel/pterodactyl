const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$updateEmail",
    version: "1.2.0",
    description: "Updates the email address of the account",
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
            name: "email",
            description: "New email address",
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
    async execute(ctx, [variable, email, password]) {
        return this.successJSON(await request(variable, "PUT", "/account/email", JSON.stringify({ email, password })));
    }
});