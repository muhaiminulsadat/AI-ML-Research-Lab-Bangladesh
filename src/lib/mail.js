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
      subject: `Registration Approved: ${workshopTitle}`,
      html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #090A0F; color: #f8fafc; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.08); overflow: hidden;">
      
      <!-- Top Cyan Accent -->
      <div style="height: 4px; background-color: #06b6d4;"></div>

      <!-- Header -->
      <div style="padding: 40px 40px 20px;">
        <p style="margin: 0; font-size: 11px; font-weight: 600; color: #06b6d4; letter-spacing: 0.15em; text-transform: uppercase;">
          ML & AI Research Lab, Bangladesh 
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 0 40px 40px;">
        <h2 style="margin: 0 0 24px; font-size: 36px; font-weight: 800; color: #ffffff; letter-spacing: -0.03em; line-height: 1.2;">
          Registration <span style="color: #06b6d4;">Approved</span> 🎉
        </h2>
        
        <p style="margin: 0 0 16px; font-size: 16px; color: #cbd5e1; line-height: 1.6;">
          Hi <strong style="color: #ffffff; font-weight: 500;">${userName}</strong> 👋,
        </p>
        
        <p style="margin: 0 0 32px; font-size: 16px; color: #cbd5e1; line-height: 1.6;">
          Congratulations! Your registration has been successfully confirmed. We are thrilled to welcome you to our upcoming session. 🚀
        </p>

        <!-- Workshop Details (Minimalist) -->
        <div style="background-color: rgba(6, 182, 212, 0.04); border-left: 4px solid #06b6d4; padding: 24px; margin-bottom: 32px; border-radius: 4px 12px 12px 4px;">
          <p style="margin: 0 0 12px; font-size: 13px; font-weight: 600; color: #06b6d4; text-transform: uppercase; letter-spacing: 0.08em;">
            Workshop Details
          </p>
          <p style="margin: 0 0 20px; font-size: 20px; font-weight: 600; color: #ffffff; letter-spacing: -0.01em;">
            ${workshopTitle}
          </p>
          
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
            <tr>
              <td style="padding: 0 0 16px 0; width: 32px; font-size: 20px;">📅</td>
              <td style="padding: 0 0 16px 0;">
                <p style="margin: 0; font-size: 15px; color: #f8fafc; font-weight: 500;">
                  <span style="color: #94a3b8; display: block; font-size: 12px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Date</span>
                  Apr 22, 2026
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 0; width: 32px; font-size: 20px;">📍</td>
              <td style="padding: 0;">
                <p style="margin: 0; font-size: 15px; color: #f8fafc; font-weight: 500;">
                  <span style="color: #94a3b8; display: block; font-size: 12px; font-weight: 400; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Venue</span>
                  Engineering Faculty, Chittagong University
                </p>
              </td>
            </tr>
          </table>
        </div>

        <p style="margin: 0 0 32px; font-size: 15px; color: #94a3b8; line-height: 1.6;">
          Event details and further instructions will be sent to your inbox closer to the date. 📩
          <br><br>
          For any queries, please reach out to us at <a href="mailto:contact@mlai-research-bd.org" style="color: #06b6d4; text-decoration: none;">contact@mlai-research-bd.org</a>.
        </p>

        <p style="margin: 0 0 8px; font-size: 15px; color: #cbd5e1;">Best regards,</p>
        <p style="margin: 0; font-size: 15px; font-weight: 500; color: #ffffff;">ML & AI Research Lab Team ⚡</p>
      </div>

      <!-- Footer -->
      <div style="padding: 24px 40px; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: left;">
        <p style="margin: 0; font-size: 12px; color: #64748b;">
          &copy; ${new Date().getFullYear()} ML & AI Research Lab. All rights reserved.
        </p>
      </div>

    </div>
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
