const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");


dotenv.config();

const User = require("../../models/user/User");





const registerUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  if (!name || !email || !password) {
    return res.status(403).json({
      message: "Either Name or Email or Password has not been provided",
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User Already Exist!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

    await newUser.save();

    const token = await jwt.sign(
      { userId: newUser._id },
      process.env.jwt_secret,
      { expiresIn: "5hr" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error("[USER_REGISTRATION_ERROR]", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const registeredUser = await User.findOne({ email });
    if (!registeredUser) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const verifyPassword = await bcrypt.compare(
      password,
      registeredUser.password
    );
    if (!verifyPassword) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      { userId: registeredUser._id },
      process.env.jwt_secret,
      { expiresIn: "5hr" }
    );

    return res.status(200).json({
      message: "Logged in Successfully",
      user: {
        userId: registeredUser.id,
        userName: registeredUser.name,
        userProfile: registeredUser.imageUrl,
        userEmail: registeredUser.email,
        userProfileCompleted: registeredUser.isProfileComplete,
      },
      token,
    });
  } catch (error) {
    console.error("[LOGIN_ERROR]", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user: {
        userId: user.id,
        userName: user.name,
        userProfile: user.imageUrl,
        userEmail: user.email,
        userProfileCompleted: user.isProfileComplete,
      },
    });
  } catch (error) {
    console.error("[GET_USER_INFO_ERROR]", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const changeProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    user.imageUrl = req.file.path;
    await user.save();
    return res.status(200).json({
      message : "Profile image changed"
    })
  } catch (error) {
    console.log('[PROFILE_IMAGE_CHANGE_ERRROR]', error.message)
    return res.status(500).json({ message: "Internal Server Error" });
    
  }
};

const deleteProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    user.imageUrl = "";
    await user.save();
    return res.status(200).json({
      message : "Profile image removed"
    })
  } catch (error) {
    console.log('[PROFILE_IMAGE_CHANGE_ERRROR]', error.message)
    return res.status(500).json({ message: "Internal Server Error" });
    
  }
};
module.exports = { registerUser, loginUser, getUserData , changeProfile , deleteProfile };
