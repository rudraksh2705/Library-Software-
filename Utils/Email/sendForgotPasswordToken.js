module.exports = function generateForgotPasswordEmailTemplate(
  resetPasswordUrl
) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; background-color: #1a1a1a;">
    <h2 style="color: #fff; text-align: center;">Reset Your Password</h2>
    <p style="font-size: 16px; color: #ccc;">Dear User,</p>
    <p style="font-size: 16px; color: #ccc;">You requested to reset your password. Please click the button below to reset it.</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${resetPasswordUrl}"
         style="display: inline-block; font-size: 16px; font-weight: bold; color: #000; background-color: #f1c40f; padding: 12px 20px; border-radius: 5px; text-decoration: none;">
         Reset Password
      </a>
    </div>
    <p style="font-size: 16px; color: #ccc;">If you did not request this, please ignore this email. The link will expire soon for security reasons.</p>
    <p style="font-size: 16px; color: #ccc;">If the button above doesn’t work, copy and paste the following link into your browser:</p>
    <p style="font-size: 16px; color: #fff; word-wrap: break-word;">
      ${resetPasswordUrl}
    </p>
    <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #666;">
      <p>Thank you,<br>BookWorm Team</p>
      <p style="font-size: 12px; color: #444;">This is an automated message. Please do not reply to this email.</p>
    </footer>
  </div>
  `;
};
