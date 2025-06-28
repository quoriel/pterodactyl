const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$deleteTask",
    version: "1.0.0",
    description: "Deletes the selected task in the schedule",
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
        }
    ],
    async execute(ctx, [variable, server, schedule, task]) {
        const endpoint = `servers/${server}/schedules/${schedule}/tasks/${task}`;
        const result = await request(variable, "DELETE", endpoint);
        return this.successJSON(result);
    }
});