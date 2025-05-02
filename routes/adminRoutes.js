const express = require("express");
const router = express.Router();
const {
  adminSignup,
  adminLogin,
  forgotPassword,
  resetPassword,
  updateAdminProfile,
} = require("../controller/adminController");
const { verifyToken } = require("../middlewares/authMiddleware"); 
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin related APIs for authentication, signup, login, etc.
 */

/**
 * @swagger
 * /project/api/v1/admin/signup:
 *   post:
 *     summary: Signup for an admin account
 *     description: Create a new admin account by providing email and password.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin created
 *                 token:
 *                   type: string
 *                   example: "jwt_token"
 *       400:
 *         description: Bad request, admin already exists
 *       500:
 *         description: Internal server error
 */
router.post("/signup", adminSignup); // Admin Signup

/**
 * @swagger
 * /project/api/v1/admin/login:
 *   post:
 *     summary: Login for an admin
 *     description: Login with email and password to receive a JWT token.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: "jwt_token"
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: Admin not found
 */
router.post("/login", adminLogin); // Admin Login

/**
 * @swagger
 * /project/api/v1/admin/forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: Send a password reset link to the admin's email.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *     responses:
 *       200:
 *         description: Password reset link sent
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */
router.post("/forgot-password", forgotPassword); // Forgot Password

/**
 * @swagger
 * /project/api/v1/admin/reset-password:
 *   post:
 *     summary: Reset password
 *     description: Reset the password using the reset token and new password.
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "jwt_reset_token"
 *               newPassword:
 *                 type: string
 *                 example: "newPassword123"
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid token or missing data
 *       500:
 *         description: Internal server error
 */
router.post("/reset-password", resetPassword); // Reset Password

/**
 * @swagger
 * /project/api/v1/admin/profile:
 *   put:
 *     summary: Update admin profile
 *     description: Admin can update their name, designation, contact number, address, professional email, and image.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []  # This indicates that the API is secured with a Bearer token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               designation:
 *                 type: string
 *                 example: Photographer
 *               contactNumber:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "1234 Street, City, Country"
 *               professionalEmail:
 *                 type: string
 *                 example: "john.doe@photography.com"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 admin:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     designation:
 *                       type: string
 *                       example: Photographer
 *                     contactNumber:
 *                       type: string
 *                       example: "+1234567890"
 *                     address:
 *                       type: string
 *                       example: "1234 Street, City, Country"
 *                     professionalEmail:
 *                       type: string
 *                       example: "john.doe@photography.com"
 *                     image:
 *                       type: string
 *                       example: "https://image_url.com/profile_image.jpg"
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */
router.put("/profile", verifyToken, updateAdminProfile);
module.exports = router;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
