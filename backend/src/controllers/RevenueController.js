const Revenue = require("../models/Revenue");
const User = require("../models/User");
const ObjectId = require("../helpers/ObjectId");

const createRevenue = async (req, res) => {
    const { weight, age, drops } = req.body;
    const reqUser = req.user;

    const user = await User.findById(reqUser._id);
    const newRevenue = await Revenue.create({
        weight,
        age,
        drops,
        userId: user._id,
        userName: user.name,
    });

    if (!newRevenue) {
        res.status(422).json({
            errors: [
                "Houve um problema, por favor tente novamente mais tarde.",
            ],
        });
        return;
    }

    res.status(201).json(newRevenue);
};

const getUserRevenue = async (req, res) => {
    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    const revenue = await Revenue.find({ userId: user._id })
        .sort([["createdAt", -1]])
        .exec();

    res.status(200).json(revenue);
};

const getRevenueById = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;

    const revenue = await Revenue.findById(ObjectId(id));

    if (!revenue) {
        res.status(404).json({ errors: ["Receita não encontrada"] });
        return;
    }

    if (!revenue.userId.equals(reqUser._id)) {
        res.status(422).json({
            errors: ["Ocorreu um erro por favor tente mais tarde"],
        });
        return;
    }

    res.status(200).json(revenue);
};

const deleteRevenue = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;

    try {
        const revenue = await Revenue.findById(ObjectId(id));

        if (!revenue) {
            res.status(404).json({ errors: ["Receita não encontrada."] });
            return;
        }

        if (!revenue.userId.equals(reqUser._id)) {
            res.status(422).json({
                errors: ["Houve um erro por favor tente mais tarde."],
            });
            return;
        }

        await Revenue.findByIdAndDelete(revenue._id);

        res.status(200).json({
            id: revenue._id,
            message: "receita excluida com sucesso.",
        });
    } catch (error) {
        res.status(404).json({ errors: ["Receita não encontrada."] });
        return;
    }
};

module.exports = {
    createRevenue,
    getUserRevenue,
    getRevenueById,
    deleteRevenue,
};
