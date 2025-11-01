module.exports = function verificationTemplate(userName, bookTitle, otp) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Book Issued Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f5f6fa; margin: 0; padding: 0;">
    <table align="center" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background: #ffffff; border-radius: 10px; overflow: hidden; margin-top: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <tr>
        <td style="background-color: #2e86de; padding: 20px 30px;">
          <h2 style="color: #ffffff; margin: 0; font-weight: 600;">Andaman College</h2>
        </td>
      </tr>

      <tr>
        <td style="padding: 30px;">
          <p style="font-size: 16px; color: #333333; margin-bottom: 10px;">
            Hello <strong>${userName}</strong>,
          </p>
          <p style="font-size: 15px; color: #555555; line-height: 1.6;">
            We are pleased to inform you that your request for the book <strong>"${bookTitle}"</strong> has been <strong>approved and issued</strong>.
            Please use the verification code below to confirm your identity when collecting the book from the library counter.
          </p>

          <div style="text-align: center; margin: 25px 0;">
            <div style="display: inline-block; background-color: #f1f3f6; border-radius: 8px; padding: 15px 25px;">
              <span style="font-size: 28px; font-weight: bold; color: #2e86de; letter-spacing: 4px;">${otp}</span>
            </div>
          </div>

          <p style="font-size: 14px; color: #666666;">
            This verification code will expire in <strong>10 minutes</strong>. Please do not share it with anyone.
            If you did not request this book, contact the librarian immediately.
          </p>

          <p style="margin-top: 30px; font-size: 14px; color: #333333;">
            Regards,<br />
            <strong>Andaman College</strong><br />
            College of Computer Science
          </p>
        </td>
      </tr>

      <tr>
        <td style="background-color: #f1f3f6; padding: 15px; text-align: center; font-size: 12px; color: #999999;">
          &copy; 2025 Library Management System. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
