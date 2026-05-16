const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$deleteTask",
    version: "1.2.0",
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
        return this.successJSON(await request(variable, "DELETE", "/servers/" + server + "/schedules/" + schedule + "/tasks/" + task));
    }
});