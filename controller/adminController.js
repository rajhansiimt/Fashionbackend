const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Assuming User is your model
const { sendPasswordResetEmail } = require("../services/emailService"); // Utility for sending reset password emails
const jwt = require("jsonwebtoken");

// Replace hardcoded JWT_SECRET with the one from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Admin Signup
exports.adminSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin already exists
    const admin = await User.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new User({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    // Generate JWT token
    const token = jwt.sign({ adminId: newAdmin._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "Admin created",
      token,
    });
  } catch (error) {
    console.error("Error during admin signup:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await User.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Include complete admin details to send in the response (excluding sensitive information like password)
    const adminDetails = {
      adminId: admin._id, // Admin's unique identifier
      name: admin.name, // Admin's name
      email: admin.email, // Admin's email
      designation: admin.designation, // Admin's designation (if available)
      contactNumber: admin.contactNumber, // Admin's contact number
      address: admin.address, // Admin's address (if available)
      professionalEmail: admin.professionalEmail, // Admin's professional email (if available)
      image: admin.image, // Admin's profile image (if available)
      createdAt: admin.createdAt, // Admin's account creation timestamp
      updatedAt: admin.updatedAt, // Admin's last update timestamp
    };

    // Return the response with the token and admin details
    res.status(200).json({
      message: "Login successful",
      token, // JWT token to authenticate future requests
      admin: adminDetails, // Complete admin details
    });
  } catch (error) {
    // Catch any errors and respond with an internal server error
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await User.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Send password reset email (use a real email service like SendGrid, SES, etc.)
    const resetToken = jwt.sign({ adminId: admin._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    await sendPasswordResetEmail(admin.email, resetToken);

    res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await User.findById(decoded.adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: "Invalid token or missing data" });
  }
};

// Update Admin Profile
exports.updateAdminProfile = async (req, res) => {
  try {
    // Get adminId from the token (already attached to req.admin by the verifyToken middleware)
    const adminId = req.admin.adminId;

    // Find the admin by their ID
    const admin = await User.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Extract profile data from the request body
    const {
      name,
      designation,
      contactNumber,
      address,
      professionalEmail,
      image,
    } = req.body;

    // Update admin profile fields
    if (name) admin.name = name;
    if (designation) admin.designation = designation;
    if (contactNumber) admin.contactNumber = contactNumber;
    if (address) admin.address = address;
    if (professionalEmail) admin.professionalEmail = professionalEmail;
    if (image) admin.image = image; // Assuming you are handling image URLs

    // Save the updated admin profile to the database
    await admin.save();

    // Return the updated profile
    return res.status(200).json({
      message: "Profile updated successfully",
      admin,
    });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
