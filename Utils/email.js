const nodemailer = require("nodemailer");
const mailTemplate = require("./EmailTemplates/verificationTemp");
const generateForgotPasswordEmailTemplate = require("./EmailTemplates/forgetPassTemp");

async function sendEmail(payload, res, subject, email) {
  const transporter = nodemailer.createTransport({
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let htmlContent;

  if (subject === "Verification Code For Registering") {
    htmlContent = mailTemplate(payload); // payload is OTP
  } else if (subject === "Forgot Password (Andaman College)") {
    // Construct the reset URL manually (example)
    const forgetPassUrl = `http://localhost:3000/reset-password/${payload}`;
    htmlContent = generateForgotPasswordEmailTemplate(forgetPassUrl);
  } else {
    htmlContent = "<p>No template defined for this email type</p>";
  }

  await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: email,
    subject: subject,
    html: htmlContent,
  });

  console.log("Email sent successfully");

  return res.status(201).json({
    status: "success",
    message: `Email sent to ${email}`,
  });
}

module.exports = sendEmail;
