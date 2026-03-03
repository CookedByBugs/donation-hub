const User = require("../../models/user/user.model");
const mongoose = require("mongoose")
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

module.exports = {
    fetchProfile,
};
