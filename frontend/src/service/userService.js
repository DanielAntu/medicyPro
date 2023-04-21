import { api, requestConfig } from "../utils/config";

const profile = async (data, token) => {
    const config = requestConfig("GET", data, token);

    const res = await fetch(api + "/users/profile", config)
        .then((res) => res.json())
        .catch((err) => err);

    return res;
};

const updateProfile = async (data, token) => {
    const config = requestConfig("PUT", data, token);

    const res = await fetch(api + "/users/update", config)
        .then((res) => res.json())
        .catch((err) => err);

    return res;
};

const userService = {
    profile,
    updateProfile,
};

export default userService;
