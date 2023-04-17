export const api = "http://localhost:3333/api";

export const requestConfig = (method, data, token = null) => {
    let config;

    if (method === "DELETE" || data == null) {
        config = {
            method,
            body: data,
            headers: {},
        };
    } else {
        config = {
            method,
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        };
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};
