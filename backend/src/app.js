const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// conection to the bank
require("./db/conn");

module.exports = app;
