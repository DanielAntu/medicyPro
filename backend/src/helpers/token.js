const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;

const generateToken = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: "7d",
    });
};

module.exports = generateToken;
