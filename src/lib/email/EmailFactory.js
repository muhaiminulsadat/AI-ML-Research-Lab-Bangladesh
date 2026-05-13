import {NodemailerProvider} from "./providers/NodemailerProvider.js";
import {ResendProvider} from "./providers/ResendProvider.js";

export class EmailFactory {
  static getInstance() {
    const providerStr = process.env.EMAIL_PROVIDER?.toLowerCase();

    if (providerStr === "resend") {
      if (!process.env.RESEND_API_KEY) {
        console.warn(
          "Warning: RESEND_API_KEY is not set in environment variables.",
        );
      }
      return new ResendProvider();
    }

    // Fallback/Default to Nodemailer
    return new NodemailerProvider();
  }
}
