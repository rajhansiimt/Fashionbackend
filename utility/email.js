const nodemailer = require("nodemailer");
const fs = require("fs");

const logger = require("./coustomlogger");

const sendOtpEmail = async (user) => {
  try {
    const buffer = fs.readFileSync(__dirname + "/otpTemplate.html");
    let otpTemplate = buffer.toString();
    otp = user.otp;

    otpTemplate = otpTemplate.replace(/{otp}/g, otp);
    await sendEmail({
      email: user.email,
      userId: user.id,
      subject: "app-otp",
      message: otpTemplate,
    });
  } catch (error) {
    logger.errorlLog(
      `Unable to create otp email template: ${JSON.stringify(error)}`
    );
    throw new Error(error.message);
  }
};

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      port: process.env.EMAIL_PORT,
      host: process.env.EMAIL_HOST,

      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    console.log("123456789", process.env.EMAIL_PORT, process.env.EMAIL_HOST);

    const mailOptions = {
      from: '"notifications"  <notifications@nishapartments.com>', //sender Address
      to: options.email,
      subject: options.subject,
      html: options.message,
    };

    await transporter.sendMail(mailOptions).then((reponse, error) => {
      if (error) {
        throw new Error("Faild to send email");
      }
    });
  } catch (error) {
    logger.errorlLog(`Unable to send Email : ${JSON.stringify(error)}`);
    throw new Error(error.message);
  }
};

module.exports = {
  sendOtpEmail,
};
