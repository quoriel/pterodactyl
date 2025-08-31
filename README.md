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
            "example": {
                "url": "EXAMPLE-URL",
                "key": "EXAMPLE-KEY",
                "headers": {
                    "User-Agent": "..."
                }
            }
        })
    ]
});

client.login("...");
```

### Structure
The `url` and `key` values **are not specified directly**, but are read from `process.env`.
- **url** - the name of the environment variable (`process.env`) that stores the URL of your panel (for example: `panel.domain.com`).
- **key** - the name of the environment variable containing the **Pterodactyl client API key**.
- **headers** *(optionally)* - object with additional headers to be sent in each request.

### Usage
Data for example work:
```json
{
    "example": {
        "url": "EXAMPLE-URL",
        "key": "EXAMPLE-KEY"
    }
}
```

And in `.env` added:
```
EXAMPLE-URL=panel.example.com
EXAMPLE-KEY=ptlc_j83j98hdsa.......
```

Then all requests using the `example` variable will be sent as:
```
https://panel.example.com/api/client
// Header
Authorization: Bearer ptlc_j83j98hdsa.......
```