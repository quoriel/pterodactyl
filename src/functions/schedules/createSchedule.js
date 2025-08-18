const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$createSchedule",
    version: "1.0.0",
    description: "Creates a new schedule on the server",
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
    async execute(ctx, [variable, server, name, minute, hour, day_of_month, day_of_week, is_active]) {
        const endpoint = `servers/${server}/schedules`;
        const body = { name, minute, hour, day_of_month, day_of_week };
        if (is_active !== null) body.is_active = is_active;
        const result = await request(variable, "POST", endpoint, body);
        return this.successJSON(result);
    }
});