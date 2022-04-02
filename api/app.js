require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const connectDB = require("./database");

connectDB();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/users", require("./routes/user"));
app.use("/api/washing-program", require("./routes/washingProgram"));
app.use("/api/order", require("./routes/order"));

module.exports = app;
