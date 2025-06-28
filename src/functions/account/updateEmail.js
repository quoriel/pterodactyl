const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$updateEmail",
    version: "1.0.0",
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
        const endpoint = "account/email";
        const body = { email, password };
        const result = await request(variable, "PUT", endpoint, body);
        return this.successJSON(result);
    }
});