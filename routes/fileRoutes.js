const express = require("express");
const router = express.Router();
const FileController = require("../controllers/fileController");
const jwt = require("jsonwebtoken");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const jwtSecret = require("../config/jwtSecret");
const User = require("../models/user");

const authenicateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, jwtSecret);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

router.post(
  "/upload",
  authenicateUser,
  upload.single("file"),
  FileController.uploadFile
);

router.get("/list-files", authenicateUser, FileController.listFiles);

module.exports = router;
