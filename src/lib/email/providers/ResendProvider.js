import {Resend} from "resend";
import {EmailProvider} from "../EmailProvider.js";

export class ResendProvider extends EmailProvider {
  constructor() {
    super();
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail({to, subject, html, from}) {
    const sender = from || process.env.EMAIL_FROM;

    const {data, error} = await this.resend.emails.send({
      from: sender,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
    }

    return {data, error};
  }
}
