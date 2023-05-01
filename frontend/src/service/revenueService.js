import { api, requestConfig } from "../utils/config";

const createRevenue = async (data, token) => {
    try {
        const config = requestConfig("POST", data, token);

        const res = await fetch(api + "/revenue/create", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const getUserRevenue = async (token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/revenue/", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const deleteRevenue = async (id, token) => {
    const config = requestConfig("DELETE", null, token);

    try {
        const res = await fetch(`${api}/revenue/${id}`, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const getRevenuebyId = async (id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(`${api}/revenue/${id}`, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const updateRevenue = async (id, data, token) => {
    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(`${api}/revenue/${id}`, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const revenueService = {
    createRevenue,
    getUserRevenue,
    deleteRevenue,
    getRevenuebyId,
    updateRevenue,
};

export default revenueService;
