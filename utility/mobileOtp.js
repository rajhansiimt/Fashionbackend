const twilio = require("twilio");
const logger = require("./coustomlogger");

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOtpSms = async (user) => {
  try {
    const otp = user.otp;
    const message = `Your OTP code is ${otp}`;
    const to = formatPhoneNumber(user.mobileNumber);

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });
  } catch (error) {
    logger.errorlLog(`Unable to send OTP SMS: ${JSON.stringify(error)}`);
    throw new Error(error.message);
  }
};

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber.startsWith("+")) {
    // Assuming the phone number is from the US if no country code is provided
    phoneNumber = `+91${phoneNumber}`;
  }
  return phoneNumber;
};

module.exports = {
  sendOtpSms,
};
