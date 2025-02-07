const User = require("../models/User.js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");


const Register = async (req, res) => {
  // Convert the username to lowercase for case-insensitivity
  const username = req.body.formData.username.toLowerCase();
  const email = req.body.formData.email.toLowerCase();

  const newUser = new User({
    username: username,
    email: email,
    password: CryptoJS.AES.encrypt(
      req.body.formData.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    // Check if the username or email already exists (case-insensitive)
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }]
    });
    
    if (existingUser) {
      return res
        .status(409)
        .json({ status: 409, msg: "username or email already exists" });
    }

    // Save the new user if no conflict is found
    const savedUser = await newUser.save();
    res.status(200).json({ status: 200, msg: "user created successfully" });
  } catch (err) {
    res.status(500).json({ status: 500, msg: "Error creating user" });
  }
};


const Login = async (req, res) => {
  try {
    // Convert the username to lowercase for case-insensitivity
    const username = req.body.formData.username.toLowerCase();

    // Find the user by the case-insensitive username
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        status: 401,
        msg: "User Not Found With This username",
      });
    }

    // Decrypt the stored password
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    // Check if the decrypted password matches the input
    if (originalPassword !== req.body.formData.password) {
      return res.status(401).json({ status: 401, msg: "Password is incorrect" });
    }

    // Generate an access token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC
    );

    // Exclude password from the response
    const { password, isAdmin, ...others } = user._doc;

    res.status(200).json({ ...others, isAdmin, accessToken, status: 200 });
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = { Register, Login };
