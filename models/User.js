const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [false, "Name is required for registration, but not for login"], // Making name optional for login
    },
    designation: {
      type: String, // Admin's job title or role
    },
    contactNumber: {
      type: String, // Admin's contact number
    },
    address: {
      type: String, // Admin's address
    },
    professionalEmail: {
      type: String, // Admin's professional email id (for photography)
    },
    image: {
      type: String, // URL to the image (e.g., image stored in S3 or local directory)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
