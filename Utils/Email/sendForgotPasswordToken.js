module.exports = function generateForgotPasswordEmailTemplate(
  resetPasswordUrl
) {
  // Returns an HTML string to be used as the email body
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Password reset</title>
  <style>
    /* Basic, safe email styles (kept inline-friendly) */
    body { margin:0; padding:0; background-color:#f4f6f8; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
    .container { width:100%; max-width:680px; margin:0 auto; padding:24px; }
    .card { background:#ffffff; border-radius:8px; padding:32px; box-shadow:0 2px 6px rgba(16,24,40,0.06); }
    h1 { font-size:20px; margin:0 0 8px; color:#0f172a; }
    p { margin:0 0 16px; line-height:1.5; color:#334155; }
    .btn { display:inline-block; text-decoration:none; padding:12px 20px; border-radius:8px; font-weight:600; border:0; }
    .btn-primary { background:#0ea5a4; color:#ffffff; }
    .muted { color:#94a3b8; font-size:13px; }
    .footer { font-size:13px; color:#94a3b8; text-align:center; margin-top:20px; }
    .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; }
    /* Make button full-width on small screens */
    @media (max-width:480px) {
      .btn { display:block; width:100%; text-align:center; }
      .card { padding:20px; }
    }
  </style>
</head>
<body>
  <!-- Preheader: short summary shown in inbox preview -->
  <span class="preheader">Reset your password — link expires in 1 hour</span>

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table class="container" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td class="card" style="padding:32px;">
              <!-- Header / Logo -->
              <table width="100%" role="presentation">
                <tr>
                  <td style="text-align:left;">
                    <!-- Replace with <img> tag for real logo if you have one -->
                    <strong style="font-size:16px;color:#0f172a;">Andaman College</strong>
                  </td>
                  <td style="text-align:right; color:#64748b; font-size:13px;">Password reset</td>
                </tr>
              </table>

              <hr style="border:none;border-top:1px solid #eef2f7;margin:20px 0;">

              <!-- Body -->
              <h1>Password reset request</h1>
              <p>We received a request to reset the password for your account. Click the button below to set a new password. This link will expire in <strong>15 min</strong>.</p>

              <!-- CTA Button -->
              <p style="margin:24px 0;">
                <a href="${resetPasswordUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer" style="background:#0ea5a4;color:#fff;padding:12px 20px;border-radius:8px;font-weight:600;display:inline-block;">
                  Reset password
                </a>
              </p>

              <!-- Fallback link -->
              <p class="muted">If the button doesn't work, copy and paste the following link into your browser:</p>
              <p style="word-break:break-all;"><a href="${resetPasswordUrl}" target="_blank" rel="noopener noreferrer" style="color:#0ea5a4;">${resetPasswordUrl}</a></p>

              <!-- Safety note -->
              <p class="muted" style="margin-top:20px;">If you did not request a password reset, you can safely ignore this email. No changes were made to your account.</p>

              <!-- Support -->
              <hr style="border:none;border-top:1px solid #eef2f7;margin:20px 0;">
              <p style="margin:0;font-size:13px;color:#475569;">Need help? Contact our support at <a href="mailto:support@yourcompany.com" style="color:#0ea5a4;">support@yourcompany.com</a></p>

              <!-- Footer -->
              <div class="footer">
                <p style="margin:8px 0 0;">© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
