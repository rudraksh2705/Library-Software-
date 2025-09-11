const nodemailer = require("nodemailer");

module.exports = sendEmail = async (
  res,
  email,
  subject,
  message,
  postmanmsg
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html: message,
    });

    console.log("mail sent successfully");
    res.status(201).json({
      status: "success",
      message: postmanmsg,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: `Something went wrong , verification code not sent `,
    });
  }
};
