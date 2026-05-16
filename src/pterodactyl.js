const { Pool } = require("undici");

let config = {};
const pools = {};

async function request(variable, method, endpoint, body, headers) {
    const con = config[variable] || {};
    try {
        const response = await pools[con.url].request({
            path: "/api/client" + endpoint,
            method,
            body,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${con.key}`,
                ...con.headers,
                ...headers
            }
        });
        return (await response.body.text()) || { result: "Successful" };
    } catch (error) {
        return {
            errors: [
                {
                    code: "NetworkOrFetchError",
                    detail: error.message
                }
            ]
        };
    }
}

module.exports = { config, pools, request };