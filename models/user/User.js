const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl : { type: String , default : "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isProfileComplete: { type: Boolean, default : false }
});

module.exports = mongoose.model("User", UserSchema) || mongoose.models.User;
