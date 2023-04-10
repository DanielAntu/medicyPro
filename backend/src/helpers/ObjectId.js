const mongoose = require("mongoose");

const ObjectId = (id) => {
    return new mongoose.Types.ObjectId(id);
};

module.exports = ObjectId;
