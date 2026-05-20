const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$deleteSshKey",
    version: "1.2.0",
    description: "Removes an SSH public key from the account",
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
            name: "fingerprint",
            description: "SSH key fingerprint to remove",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, fingerprint]) {
        return this.successJSON(await request(variable, "POST", "/account/ssh-keys/remove", JSON.stringify({ fingerprint })));
    }
});