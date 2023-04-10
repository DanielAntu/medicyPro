const mongoose = require("mongoose");
const { Schema } = mongoose;

const RevenueSchema = new Schema(
    {
        weight: {
            type: Number,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        drops: {
            type: Number,
            required: true,
        },
        userId: mongoose.ObjectId,
        userName: String,
    },
    { timestamps: true }
);

const Revenue = mongoose.model("revenue", RevenueSchema);
module.exports = Revenue;
