const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$sendCommand",
    version: "1.0.0",
    description: "Sends a command to the server (The server must be online to execute the command)",
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
            name: "server",
            description: "Server identifier",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "command",
            description: "Command to send",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, command]) {
        const endpoint = `servers/${server}/command`;
        const body = { command };
        const result = await request(variable, "POST", endpoint, body);
        return this.successJSON(result);
    }
});