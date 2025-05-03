const nodemailer = require("nodemailer");
const fs = require("fs");

const logger = require("../utility/coustomlogger");

const sendCredEmail = async (user) => {
  try {
    const buffer = fs.readFileSync(__dirname + "/credentialMailTemplate.html");
    let mailTemplate = buffer.toString();
    email = user.email;
    password = user.password;

    mailTemplate = mailTemplate
      .replace(/{email}/g, email)
      .replace(/{password}/g, password);

    await sendEmail({
      email: user.email,
      userId: user.id,
      subject: "Your Credential",
      message: mailTemplate,
    });
  } catch (error) {
    logger.errorlLog(
      `Unable to create mail template: ${JSON.stringify(error)}`
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
      from: '"notifications"  <notifications@lh.com>', //sender Address
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
  sendCredEmail,
};
