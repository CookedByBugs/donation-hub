const User = require("../../models/user/user.model");
const mongoose = require("mongoose");
const { upload } = require("../../utils/cloudinary/cloudinary");
const fs = require("fs");

const updateImageController = async (req, res) => {
    try {
        const { id } = req.user;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "Profile image is required" });
        }
        let result;
        await upload(req.file.path, {
            folder: "user",
        })
            .then((imgUrl) => {
                result = imgUrl;
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                fs.unlinkSync(req.file.path);
            });
        let user = await User.findByIdAndUpdate(id, { $set: { profileImage: result.secure_url } }, { new: true });
        return res.status(200).json({ message: "User image updated successfully", status: "success", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", status: "error" });
    }
}

module.exports = { updateImageController };