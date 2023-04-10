const bcrypt = require("bcryptjs");

const createHash = async (password) => {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    return passwordHash;
};

const compareHash = async (password, passwordUser) => {
    const checkPassword = await bcrypt.compare(password, passwordUser);
    return checkPassword;
};

module.exports = {
    createHash,
    compareHash,
};
