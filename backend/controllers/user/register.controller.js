const User = require("../../models/user/user.model");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { upload } = require("../../utils/cloudinary");

const registerController = async (req, res) => {
  try {
    let profileImage = null;
    let { firstName, lastName, email, password, role, NGO } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", status: "error" });
    }
    if (role === "ngo" && !NGO) {
      return res
        .status(400)
        .json({ message: "NGO name is required", status: "error" });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Profile image is required", status: "error" });
    }
    if (email == process.env.ADMIN_EMAIL) {
      role = "admin";
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

module.exports = { registerController };
