require('dotenv').config();
const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
PORT = process.env.PORT || 8000;

const cors = require("cors");


app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(`Server listening to ${PORT}`);
});













