const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  // const { amount, to } = req.body;

  // const account = await Account.findOne({
  //   userId: req.userId,
  // });

  // if (account.balance < amount) {
  //   return res.status(400).json({
  //     message: "insufficient balance",
  //   });
  // }

  // const toAccount = await findOne({
  //   userId: req.userId,
  // });

  // if (!toAccount) {
  //   return res.status(400).json({
  //     message: "invalid account please provide a valid account",
  //   });
  // }

  // await account.updateOne(
  //   {
  //     userId: req.userId,
  //   },
  //   {
  //     $inc: {
  //       balance: -amount,
  //     },
  //   }
  // );

  // await account.updateOne(
  //   {
  //     userId: to,
  //   },
  //   {
  //     $inc: {
  //       balance: amount,
  //     },
  //   }
  // );

  // res.json({
  //   message: "transfer successful",
  // });

  const session = await mongoose.startSession();

  session.startSession();
  const { amount, to } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    console.log("Insufficient Balance");
    return;
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    console.log("Invalid Account");
    return;
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);
  await session.commitTransaction();
  console.log("done");
});

module.exports = router;
