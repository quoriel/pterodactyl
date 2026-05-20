const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request, body } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$updateSchedule",
    version: "1.2.0",
    description: "Updates the selected schedule",
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
            name: "name",
            description: "Schedule name",
            type: ArgType.String,
            rest: false
        },
        {
            name: "minute",
            description: "Cron minute (0-59 or *)",
            type: ArgType.String,
            rest: false
        },
        {
            name: "hour",
            description: "Cron hour (0-23 or *)",
            type: ArgType.String,
            rest: false
        },
        {
            name: "day_of_month",
            description: "Cron day of month (1-31 or *)",
            type: ArgType.String,
            rest: false
        },
        {
            name: "month",
            description: "Cron month (1-12 or *)",
            type: ArgType.String,
            rest: false
        },
        {
            name: "day_of_week",
            description: "Cron day of week (0-6 or *)",
            type: ArgType.String,
            rest: false
        },
        {
            name: "is_active",
            description: "Enable/disable schedule",
            type: ArgType.Boolean,
            rest: false
        },
        {
            name: "only_when_online",
            description: "Only run when server is online",
            type: ArgType.Boolean,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, schedule, name, minute, hour, day_of_month, month, day_of_week, is_active, only_when_online]) {
        return this.successJSON(await request(variable, "POST", "/servers/" + server + "/schedules/" + schedule, body({ name, minute, hour, day_of_month, month, day_of_week, is_active, only_when_online })));
    }
});