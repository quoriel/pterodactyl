# QuorielPterodactyl
A convenient extension for ForgeScript that provides a complete set of functions for interacting with the Pterodactyl API (Client Category).

## Installation
```
npm i github:quoriel/pterodactyl
```

## Connection
```js
const { ForgeClient } = require("@tryforge/forgescript");
const { QuorielPterodactyl } = require("@quoriel/pterodactyl");

const client = new ForgeClient({
    extensions: [
        new QuorielPterodactyl()
    ]
});

client.login("...");
```

## Config
The **config.json** file is located in the **quoriel/pterodactyl** folder of your bot.

// Something's coming up.