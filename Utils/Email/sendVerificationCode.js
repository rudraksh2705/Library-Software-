const generateVerificationOtpEmailTemplate = require("./emailTemplate");
const sendEmail = require("./sendEmail");

module.exports = async function sendVerificationCode(
  verificationCode,
  email,
  res
) {
  try {
    const message = generateVerificationOtpEmailTemplate(verificationCode);

    sendEmail({
      email,
      subject: "Verification Code (Andaman College)",
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Verification Code sent successfuly",
    });
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: "Verification Code failed to send",
    });
  }
};
