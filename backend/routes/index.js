const express = require("express");
const userRouter = require("./user");

const router = express.Router();

app.use("/user", userRouter);
app.use("/account", accountRouter);

module.exports = { router };
 