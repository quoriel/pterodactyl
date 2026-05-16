const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$showPermissions",
    version: "1.2.0",
    description: "Returns all available permissions",
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
        return this.successJSON(await request(variable, "GET", "/permissions"));
    }
});