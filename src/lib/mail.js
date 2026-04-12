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
          ML & AI Research Lab 
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 0 40px 40px;">
        <h2 style="margin: 0 0 24px; font-size: 28px; font-weight: 300; color: #ffffff; letter-spacing: -0.02em;">
          Registration Approved 🎉
        </h2>
        
        <p style="margin: 0 0 16px; font-size: 16px; color: #cbd5e1; line-height: 1.6;">
          Hi <strong style="color: #ffffff; font-weight: 500;">${userName}</strong> 👋,
        </p>
        
        <p style="margin: 0 0 32px; font-size: 16px; color: #cbd5e1; line-height: 1.6;">
          Congratulations! Your registration has been successfully confirmed. We are thrilled to welcome you to our upcoming session. 🚀
        </p>

        <!-- Workshop Details (Minimalist) -->
        <div style="background-color: rgba(6, 182, 212, 0.04); border-left: 3px solid #06b6d4; padding: 20px 24px; margin-bottom: 32px; border-radius: 0 8px 8px 0;">
          <p style="margin: 0 0 6px; font-size: 12px; font-weight: 500; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">
            🗓️ Workshop Details
          </p>
          <p style="margin: 0; font-size: 18px; font-weight: 500; color: #ffffff;">
            ${workshopTitle}
          </p>
        </div>

        <p style="margin: 0 0 32px; font-size: 15px; color: #94a3b8; line-height: 1.6;">
          Event details and further instructions will be sent to your inbox closer to the date. 📩
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
