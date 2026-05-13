import nodemailer from "nodemailer";
import {EmailProvider} from "../EmailProvider.js";

export class NodemailerProvider extends EmailProvider {
  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail({to, subject, html, from}) {
    const sender = from || process.env.EMAIL_FROM || process.env.SMTP_EMAIL;

    try {
      const info = await this.transporter.sendMail({
        from: sender,
        to,
        subject,
        html,
      });
      return {data: info, error: null};
    } catch (error) {
      console.error("Nodemailer error:", error);
      return {data: null, error};
    }
  }
}
