const { ForgeExtension } = require("@tryforge/forgescript");
const { update } = require("./pterodactyl");
const pkg = require("../package.json");

class QuorielPterodactyl extends ForgeExtension {
    name = "QuorielPterodactyl";
    description = pkg.description;
    version = pkg.version;

    init() {
        update();
        this.load(__dirname + "/functions");
    }
}

exports.QuorielPterodactyl = QuorielPterodactyl;