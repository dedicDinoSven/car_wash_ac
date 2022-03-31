require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));

module.exports = app;
