const mongoose = require("mongoose");

const mongoDB = process.env.MONGO_URI;

mongoose.connect(mongoDB)
    .then(()=> console.log("Database connected"))

const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    maxLength: 50,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = new mongoose.model("User", userSchema);
const Account = new mongoose.model("Account", userSchema);

module.exports = {
  User,
  Account,
};
