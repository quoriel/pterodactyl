const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

const ActionType = {
    command: "command",
    power: "power",
    backup: "backup"
};

exports.default = new NativeFunction({
    name: "$updateTask",
    version: "1.0.0",
    description: "Updates the selected task in the schedule",
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
            name: "task",
            description: "Task identifier",
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
    async execute(ctx, [variable, server, schedule, task, action, payload, time_offset]) {
        const endpoint = `servers/${server}/schedules/${schedule}/tasks/${task}`;
        const body = { action, payload, time_offset };
        const result = await request(variable, "POST", endpoint, body);
        return this.successJSON(result);
    }
});