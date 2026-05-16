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
        new QuorielPterodactyl({
            "main_panel": {
                "url": "panel.example.com",
                "key": "ptlc_YourSuperSecretApiKeyHere"
            },
            "second_panel": {
                "url": "another-panel.net",
                "key": "ptlc_AnotherApiKeyFromSecondPanel",
                "headers": {
                    "User-Agent": "Quoriel/1.0"
                }
            }
        })
    ]
});

client.login("...");
```

> [!NOTE]
> The key in the configuration object (e.g., `main_panel`) is the identifier you will use in functions to specify which panel to send the request to.