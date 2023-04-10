const mongoose = require("mongoose");
require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.dfzxbt1.mongodb.net/?retryWrites=true&w=majority`
        );
        console.log("connected to the bank!");
        return dbConn;
    } catch (error) {
        console.log(error);
    }
};

conn();

module.exports = conn;
