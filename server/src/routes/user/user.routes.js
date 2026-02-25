const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  registerController,
  loginController,
  fetchProfile,
} = require("../../controllers/user/user.controller");
const verifyToken = require("../../middlewares/verifyToken");
const userRouter = express.Router();

userRouter.post("/register", upload.single("profileImage"), registerController);
userRouter.post("/login", loginController);
userRouter.get("/profile", verifyToken, fetchProfile);

module.exports = userRouter;
