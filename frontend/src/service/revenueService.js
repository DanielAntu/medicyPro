import { api, requestConfig } from "../utils/config";

const createRevenue = async (data, token) => {
    const config = requestConfig("POST", data, token);

    const res = await fetch(api + "/revenue/create", config)
        .then((res) => res.json())
        .catch((err) => err);

    return res;
};

const getUserRevenue = async (token) => {
    const config = requestConfig("GET", null, token);

    const res = await fetch(api + "/revenue/", config)
        .then((res) => res.json())
        .catch((err) => err);

    return res;
};

const revenueService = {
    createRevenue,
    getUserRevenue,
};

export default revenueService;
