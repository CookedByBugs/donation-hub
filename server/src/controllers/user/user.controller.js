const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user/user.model");
const fs = require("fs");
const { upload } = require("../../utils/cloudinary/cloudinary");
//Register Controller
const registerController = async (req, res) => {
  try {
    let profileImage = null;
    const { firstName, lastName, email, password, role, NGO } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (role === "ngo" && !NGO) {
      return res.status(400).json({ message: "NGO name is required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Profile image is required" });
    }
    await upload(req.file.path, {
      folder: "user",
    })
      .then((result) => {
        profileImage = result.secure_url;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fs.unlinkSync(req.file.path);
      });
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "donor",
      NGO: NGO || null,
      profileImage,
    });
    await user.save();
    return res
      .status(201)
      .json({ message: "User created successfully", status: "success", user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};

//Login Controller

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res
      .status(200)
      .json({ message: "Login successful", token, status: "success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "error" });
  }
};

// Get User Controller
const fetchProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(400).json({ msg: "User not found" });
    res.json({ user, session: req.user });
  } catch (error) {
    res.status(400).json({ msg: "Error fetching profile", error });
    console.log(error);
  }
};

module.exports = { registerController, loginController, fetchProfile };
