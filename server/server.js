require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/configs/db");

connectDB();

module.exports = app;