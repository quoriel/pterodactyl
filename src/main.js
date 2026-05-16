const { ForgeExtension, Logger } = require("@tryforge/forgescript");
const { description, version } = require("../package.json");
const { config, pools } = require("./pterodactyl");
const { Pool } = require("undici");

class QuorielPterodactyl extends ForgeExtension {
    name = "QuorielPterodactyl";
    description = description;
    version = version;

    constructor(data) {
        super();
        try {
            Object.assign(config, data);
            for (const variable of Object.values(config)) {
                pools[variable.url] = new Pool(`https://${variable.url}`);
            }
        } catch (error) {
            Logger.error(error);
        }
    }

    init() {
        this.load(__dirname + "/functions");
    }
}

module.exports = { QuorielPterodactyl };