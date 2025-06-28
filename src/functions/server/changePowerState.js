const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

const SignalType = {
    start: "start",
    stop: "stop",
    restart: "restart",
    kill: "kill"
};

exports.default = new NativeFunction({
    name: "$changePowerState",
    version: "1.0.0",
    description: "Sends a power signal to the server",
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
            name: "signal",
            description: "Power signal to send",
            type: ArgType.Enum,
            enum: SignalType,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, signal]) {
        const endpoint = `servers/${server}/power`;
        const body = { signal };
        const result = await request(variable, "POST", endpoint, body);
        return this.successJSON(result);
    }
});