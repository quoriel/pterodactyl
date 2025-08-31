let config = {};

async function request(variable, method, endpoint, body) {
    const { url, key, headers } = config[variable] || {};
    if (!url || !key) {
        return {
            errors: [{
                code: "InvalidConfig",
                detail: "Config missing url or key properties"
            }]
        };
    }
    if (!process.env[url] || !process.env[key]) {
        return {
            errors: [{
                code: "NoEnvironmentProvided",
                detail: "Environment variables not set"
            }]
        };
    }
    let apiUrl = `https://${process.env[url]}/api/client`;
    if (endpoint) {
        if (endpoint.startsWith("?")) {
            apiUrl += endpoint;
        } else {
            apiUrl += "/" + endpoint;
        }
    }
    try {
        const response = await fetch(apiUrl, {
            method,
            body: body ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env[key]}`,
                ...headers || {},
            }
        });
        const text = await response.text();
        if (!text) {
            return { result: "Successful" };
        }
        let data;
        try {
            data = JSON.parse(text);
        } catch {
            return {
                errors: [{
                    code: "InvalidJsonResponse",
                    detail: "The server response is not valid JSON",
                    source: { raw: text }
                }]
            };
        }
        if (data && Array.isArray(data.errors)) {
            return data;
        }
        if (!response.ok) {
            return {
                errors: [{
                    code: "HttpError",
                    status: response.status,
                    detail: response.statusText,
                    source: { raw: text }
                }]
            };
        }
        return data;
    } catch (e) {
        return {
            errors: [{
                code: "NetworkOrFetchError",
                detail: e.message
            }]
        };
    }
}

module.exports = {
    request,
    config
};