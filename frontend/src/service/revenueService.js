import { api, requestConfig } from "../utils/config";

const createRevenue = async (data, token) => {
    const config = requestConfig("POST", data, token);

    const res = await fetch(api + "/revenue/create", config)
        .then((res) => res.json())
        .catch((err) => err);

    return res;
};

const revenueService = {
    createRevenue,
};

export default revenueService;
