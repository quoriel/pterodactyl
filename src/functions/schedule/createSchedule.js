const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request, body } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$createSchedule",
    version: "1.2.0",
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
            description: "Schedule name (max 255 characters)",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "minute",
            description: "Cron minute (0-59 or *)",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "hour",
            description: "Cron hour (0-23 or *)",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "day_of_month",
            description: "Cron day of month (1-31 or *)",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "month",
            description: "Cron month (1-12 or *)",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "day_of_week",
            description: "Cron day of week (0-6 or *)",
            type: ArgType.String,
            required: true,
            rest: false
        },
        {
            name: "is_active",
            description: "Enable schedule immediately (default: true)",
            type: ArgType.Boolean,
            rest: false
        },
        {
            name: "only_when_online",
            description: "Only run when server is online (default: false)",
            type: ArgType.Boolean,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, name, minute, hour, day_of_month, month, day_of_week, is_active, only_when_online]) {
        return this.successJSON(await request(variable, "POST", "/servers/" + server + "/schedules", body({ name, minute, hour, day_of_month, month, day_of_week, is_active, only_when_online })));
    }
});