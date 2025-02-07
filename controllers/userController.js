const User = require("../models/User.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const UpdateUser = async (req, res, next) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (updatedUser) {
      res.status(200).send("user has been updated");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUsername = async (req, res) => {
  const userId = req.params.id;
  const { username } = req.body;

  try {
    // Find the user by ID and update the username
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username },
      { new: true, runValidators: true } // Return the updated user and run schema validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Username updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating username" });
  }
};

const updateEmail = async (req, res) => {
  const userId = req.params.id;
  const { email } = req.body;

  try {
    // Find the user by ID and update the email
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email },
      { new: true, runValidators: true } // Return the updated user and run schema validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Email updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating email" });
  }
};

const DeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetAllUser = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  UpdateUser,
  updateUsername,
  updateEmail,
  DeleteUser,
  GetSingleUser,
  GetAllUser,
};
