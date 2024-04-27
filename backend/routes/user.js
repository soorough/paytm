const express = require("express");
import { z } from "zod";
const router = express.Router();
import JWT_SECRET from "../config";
import { authMiddleware } from "../middleware/auth";
import { Account } from "../db";
const jwt = require("jsonwebtoken");

const signupBody = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupBody.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "email already taken/ incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "email already taken/ incorrect inputs",
    });
  }

  const user = await user.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  await Account.create({
    userId,
    balance: 1 + Math.random() * 100000,
  });

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

const signinBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "email already taken/ incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.verify(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    res.json({
      message: "User authorized successfully",
      token: token,
    });
    return;
  }

  return res.status(411).json({
    message: "error with login credentials",
  });
});

const updateBody = z.object({
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = signupBody.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "error while updating the info",
    });
  }

  await User.updateOne(req.body, {
    id: req.userId,
  });

  res.json({
    message: "User updated successfully",
    token: token,
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = user;
