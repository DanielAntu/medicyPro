const User = require("../models/User");
const ObjectId = require("../helpers/ObjectId");
const { createHash, compareHash } = require("../helpers/hash");
const generateToken = require("../helpers/token");

const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        res.status(422).json({ errors: ["Por favor digite outro e-mail"] });
        return;
    }

    if (password !== confirmPassword) {
        res.status(422).json({ errors: ["As senhas precisam ser iguais"] });
        return;
    }
};

module.exports = {
    register,
};
