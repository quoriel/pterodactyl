const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$createSshKey",
    version: "1.2.0",
    description: "Adds a new SSH public key to the account",
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
            name: "name",
            description: "Descriptive name for the SSH key",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "public_key",
            description: "SSH public key content",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, name, public_key]) {
        return this.successJSON(await request(variable, "POST", "/account/ssh-keys", JSON.stringify({ name, public_key })));
    }
});