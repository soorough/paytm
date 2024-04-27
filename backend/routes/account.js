const express = require("express");
const { router } = require(".");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware/auth");

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  });

  if (account.balance < amount) {
    return res.status(400).json({
      message: "insufficient balance",
    });
  }

  const toAccount = await findOne({
    userId: req.userId,
  });

  if (!toAccount) {
    return res.status(400).json({
      message: "invalid account please provide a valid account",
    });
  }

  await account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  );

  await account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  );

  res.json({
    message: "transfer successful",
  });
});


module.exports = account;