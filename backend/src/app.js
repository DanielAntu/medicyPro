const express = require("express");
const cors = require("cors");

// ex 152

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// conection to the bank
require("./db/conn");

const router = require("./Router/Router");
app.use(router);

module.exports = app;
