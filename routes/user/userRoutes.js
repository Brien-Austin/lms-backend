const express = require("express");
const userController = require("./../../controller/user/userController");
const { verifyToken } = require("../../middleware/AuthMiddleware");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require('multer')

const router = express.Router();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
  });
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "uploads/user-profile",
      fomrat: async (req, file) => "png",
      public_id: (req, file) => Date.now().toString(),
    },
  });
  const upload = multer({storage})
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/user-info", verifyToken,userController.getUserData)
router.put("/profile-change/:userId",upload.single('file'),userController.changeProfile)
router.delete("/profile-delete/:userId",userController.deleteProfile)
module.exports = router;
