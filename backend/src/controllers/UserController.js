const User = require("../models/User");
const ObjectId = require("../helpers/ObjectId");
const { createHash, compareHash } = require("../helpers/hash");
const generateToken = require("../helpers/token");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        res.status(422).json({ errors: ["Por favor digite outro e-mail"] });
        return;
    }

    const passwordHash = await createHash(password);

    const newUser = {
        name,
        email,
        password: passwordHash,
    };

    if (!newUser) {
        res.status(422).json({
            errors: ["Erro no sistema tente novamente mais tarde."],
        });
        return;
    }

    try {
        const user = await User.create(newUser);

        res.status(201).json({ id: user._id, token: generateToken(user._id) });
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(422).json({ errors: ["O usuario não existe no sistema."] });
        return;
    }

    const checkPassword = await compareHash(password, user.password);

    if (!checkPassword) {
        res.status(422).json({ errors: ["A senha não confere."] });
        return;
    }

    res.status(200).json({ id: user._id, token: generateToken(user._id) });
};

const userCurrent = async (req, res) => {
    const user = req.user;

    res.status(200).json(user);
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(ObjectId(id)).select("-password");

        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrado"] });
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ errors: ["Usuário não encontrado"] });
        return;
    }
};

const updateUser = async (req, res) => {
    const { name, password } = req.body;

    const reqUser = req.user;

    const user = await User.findById(ObjectId(reqUser._id)).select("-password");

    if (name) {
        user.name = name;
    }

    if (password) {
        const passwordHash = await createHash(password);

        user.password = passwordHash;
    }

    await user.save();

    res.status(200).json(user);
};

module.exports = {
    register,
    login,
    userCurrent,
    getUserById,
    updateUser,
};
