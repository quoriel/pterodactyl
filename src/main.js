const { ForgeExtension, Logger } = require("@tryforge/forgescript");
const { description, version } = require("../package.json");
const { config } = require("./pterodactyl");

class QuorielPterodactyl extends ForgeExtension {
    name = "QuorielPterodactyl";
    description = description;
    version = version;

    constructor(data) {
        super();
        try {
            for (const key of Object.keys(config)) {
                delete config[key];
            }
            Object.assign(config, data);
        } catch (error) {
            Logger.error(error);
        }
    }

    init() {
        this.load(__dirname + "/functions");
    }
}

module.exports = { QuorielPterodactyl };