const User = require("../../models/user/user.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");

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

module.exports = {
    loginController,
};
