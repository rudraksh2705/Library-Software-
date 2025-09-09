const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // fixed typo
      port: process.env.SMTP_PORT, // usually 465 (secure) or 587 (TLS)
      service: process.env.SMTP_SERVICE, // optional, e.g. "gmail"
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html: message, // HTML template
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};

module.exports = sendEmail;
