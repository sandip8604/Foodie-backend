// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "User Name is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  address: {
    type: String,
  },

  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },

  usertype: {
    type: String,
    required: [true, "User type is required"],
    default: "client",
    enum: ["Customer", "admin", "vendor", "driver"],
  },

  profile: {
    type: String,
    default:
      "https://th.bing.com/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  }
  // },

  // answer: {
  //   type: String,
  // },
}, { timestamps: true });

// Export the model
module.exports = mongoose.model("User", userSchema);
