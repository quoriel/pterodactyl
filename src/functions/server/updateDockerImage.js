const { NativeFunction, ArgType } = require("@tryforge/forgescript");
const { request } = require("../../pterodactyl");

exports.default = new NativeFunction({
    name: "$updateDockerImage",
    version: "1.2.0",
    description: "Changes the Docker image used by the server",
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
            name: "docker_image",
            description: "New Docker image to use for the server",
            type: ArgType.String,
            required: true,
            rest: false
        }
    ],
    async execute(ctx, [variable, server, docker_image]) {
        return this.successJSON(await request(variable, "PUT", "/servers/" + server + "/settings/docker-image", JSON.stringify({ docker_image })));
    }
});