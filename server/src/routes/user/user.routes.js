const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { registerController } = require("../../controllers/user/register.controller");
const { loginController } = require("../../controllers/user/login.controller");
const { fetchProfile } = require("../../controllers/user/fetch-profile.controller");
const { updateImageController } = require("../../controllers/user/update-image.controller");
const verifyToken = require("../../middlewares/verifyToken");
const userRouter = express.Router();

userRouter.post("/register", upload.single("profileImage"), registerController);
userRouter.post("/login", loginController);
userRouter.get("/profile", verifyToken, fetchProfile);
userRouter.put("/update-image", verifyToken, upload.single("profileImage"), updateImageController);

module.exports = userRouter;
