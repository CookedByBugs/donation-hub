const User = require("../../models/user/user.model");
const updateProfileController = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, city, address } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { firstName, lastName, email, phone, city, address }, { new: true });
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message,
        });
    }
};

module.exports = { updateProfileController };