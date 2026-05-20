const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request, body } = require("../../pterodactyl");

const ActionType = {
    command: "command",
    power: "power",
    backup: "backup"
};

exports.default = new NativeFunction({
    name: "$updateTask",
    version: "1.2.0",
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
            description: "Action payload (command text, power action, etc.)",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "time_offset",
            description: "Delay in seconds from previous task",
            type: ArgType.Number,
            required: true,
            rest: false
        },
        {
            name: "continue_on_failure",
            description: "Continue if task fails (default: false)",
            type: ArgType.Boolean,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, schedule, task, action, payload, time_offset, continue_on_failure]) {
        return this.successJSON(await request(variable, "PATCH", "/servers/" + server + "/schedules/" + schedule + "/tasks/" + task, body({ action, payload, time_offset, continue_on_failure })));
    }
});