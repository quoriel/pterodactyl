const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$updateSchedule",
    version: "1.0.0",
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
            required: true,
            rest: false
        },
        {
            name: "minute",
            description: "Cron minute",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "hour",
            description: "Cron hour",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "day_of_month",
            description: "Cron day-of-month",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "day_of_week",
            description: "Cron day-of-week",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "is_active",
            description: "Is the schedule active",
            type: ArgType.Boolean,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, schedule, name, minute, hour, day_of_month, day_of_week, is_active]) {
        const endpoint = `servers/${server}/schedules/${schedule}`;
        const body = { name, minute, hour, day_of_month, day_of_week };
        if (is_active !== undefined) body.is_active = is_active;
        const result = await request(variable, "POST", endpoint, body);
        return this.successJSON(result);
    }
});