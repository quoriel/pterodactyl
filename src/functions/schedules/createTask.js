const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

const ActionType = {
    command: "command",
    power: "power",
    backup: "backup"
};

exports.default = new NativeFunction({
    name: "$createTask",
    version: "1.2.0",
    description: "Creates a new task in the selected schedule",
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
            name: "schedule",
            description: "Schedule identifier",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "action",
            description: "Type of action",
            type: ArgType.Enum,
            enum: ActionType,
            required: true,
            rest: false
        },
        {
            name: "payload",
            description: "Payload data",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "time_offset",
            description: "Offset in seconds",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, schedule, action, payload, time_offset]) {
        return this.successJSON(await request(variable, "POST", "/servers/" + server + "/schedules/" + schedule + "/tasks", JSON.stringify({ action, payload, time_offset })));
    }
});