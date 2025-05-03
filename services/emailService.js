const nodemailer = require("nodemailer");

const sendPasswordResetEmail = async (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your preferred email service
    auth: {
      user: "gssam4@gmail.com",
      pass: "React@12",
    },
  });

  const resetUrl = `http://your-app.com/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: "gssam4@.com",
    to: email,
    subject: "Password Reset",
    text: `Click the following link to reset your password: ${resetUrl}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail };
