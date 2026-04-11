import nodemailer from "nodemailer";

/**
 * Sends a workshop approval email using Nodemailer.
 *
 * @param {string} toEmail - The recipient's email address
 * @param {string} userName - The recipient's name
 * @param {string} workshopTitle - The title of the approved workshop
 */
export const sendWorkshopApprovalEmail = async (
  toEmail,
  userName,
  workshopTitle,
) => {
  try {
    // If we don't have credentials, we shouldn't crash the server action, just warn.
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.warn("SMTP_EMAIL or SMTP_PASSWORD is not set. Email not sent.");
      return {success: false, message: "Credentials not configured"};
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"ML & AI Research Lab" <${process.env.SMTP_EMAIL}>`,
      to: toEmail,
      subject: `🎉 Registration Approved: ${workshopTitle}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Workshop Registration Approved!</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f3f4f6; padding: 40px 20px;">
            <tr>
              <td align="center">
                <!-- Main Card -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Brand Header -->
                  <tr>
                    <td style="background-color: #090A0F; padding: 40px 30px; text-align: center; border-bottom: 4px solid #3b82f6;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -1px;">🤖 ML & AI Research Lab</h1>
                      <p style="color: #9ca3af; margin: 10px 0 0 0; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Workshop Admission</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h2 style="color: #111827; margin: 0 0 20px 0; font-size: 24px; font-weight: 700;">You're In! 🎉</h2>
                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
                        Hello <strong style="color: #111827;">${userName}</strong>, 👋<br><br>
                        Awesome news! We have reviewed your application and you are officially approved to join our upcoming workshop. 
                      </p>
                      
                      <!-- Highlight Box -->
                      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 30px 0; background: linear-gradient(to right, #eff6ff, #f8fafc); background-color: #eff6ff; border-radius: 12px; border-left: 6px solid #3b82f6;">
                        <tr>
                          <td style="padding: 24px;">
                            <p style="margin: 0; color: #2563eb; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">✨ Approved Workshop</p>
                            <p style="margin: 0; color: #1e3a8a; font-size: 20px; font-weight: 800; line-height: 1.4;">${workshopTitle}</p>
                          </td>
                        </tr>
                      </table>
                      
                      <h3 style="color: #111827; font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">🎯 What's Next?</h3>
                      <ul style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; padding-left: 20px;">
                        <li style="margin-bottom: 12px;"><strong>Mark your calendar</strong> &ndash; Get ready for an intensive learning experience! 🗓️</li>
                        <li style="margin-bottom: 12px;"><strong>Watch your inbox</strong> &ndash; We'll send venue/meeting links and preparation materials soon. 📧</li>
                        <li><strong>Join the community</strong> &ndash; Bring your curiosity and questions. 💬</li>
                      </ul>
                      
                      <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
                        Looking forward to seeing you there!<br><br>
                        Best regards,<br>
                        <strong style="color: #111827;">The ML & AI Research Lab Team 🚀</strong>
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #9ca3af; font-size: 14px; margin: 0 0 10px 0;">
                        &copy; ${new Date().getFullYear()} ML &amp; AI Research Lab.<br>All rights reserved.
                      </p>
                      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        This is an automated message. Please do not reply to this email.
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Approval email sent to:", toEmail);
    return {success: true, messageId: info.messageId};
  } catch (error) {
    console.error("Error sending workshop approval email:", error);
    return {success: false, error};
  }
};
