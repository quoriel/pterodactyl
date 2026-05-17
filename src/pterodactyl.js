const config = {};
const pools = {};

async function request(variable, method, endpoint, body, headers) {
    try {
        return (await pools[config[variable].url].request({
            path: "/api/client" + endpoint,
            method,
            body,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + config[variable].key,
                ...config[variable].headers,
                ...headers
            }
        })).body.text() || { result: "Successful" };
    } catch (error) {
        return {
            errors: [{
                code: "NetworkOrFetchError",
                detail: error.message
            }]
        };
    }
}

module.exports = { config, pools, request };
