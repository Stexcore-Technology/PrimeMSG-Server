import { readFileSync } from "fs";
import nodemailer from "nodemailer";
import path from "path";

/**
 * Email options
 */
export interface EmailOptions {
  /**
   * Email address destination
   */
  to: string;
  /**
   * Subject email
   */
  subject: string;
  /**
   * Plain text body
   */
  text?: string;
  /**
   * Html body
   */
  html?: string;
}

/**
 * Load template signin TCP
 */
interface ILoadTemplateTcpSignin {
  /**
   * Template TCP
   */
  template: "tcp-signin",
  /**
   * Username 
   */
  username: string,
  /**
   * Link verification
   */
  link_verification: string,
}

/**
 * Options to load template
 */
type ILoadTemplate =
  | ILoadTemplateTcpSignin;

/**
 * SMTP Service
 */
export default new class SMTPService {

  /**
   * transporter SMTP
   */
  private transporter: nodemailer.Transporter;

  /**
   * Initialize service
   */
  constructor() {

    // Settings Client SMTP
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE == "true",
      auth: {
        user: process.env.SMTP_ADDRESS,
        pass: process.env.SMTP_PASSWORD
      },
    });
  }

  /**
   * Send Mail logic
   * @param options Options
   */
  private async sendMailLogic(options: EmailOptions): Promise<void> {
    try {
      /**
       * Send mail using transporter
       */
      const info = await this.transporter.sendMail({
        ...options,
        from: process.env.SMTP_ADDRESS
      });

      console.log("Email sent: ", info.messageId);
    } catch (error) {
      console.error("Error sending email: ", error);
      throw error;
    }
  }

  /**
   * Send a email using a template
   * @param to Email Address destination
   * @param settings Settins to load template
   */
  public sendMail(to: string, settings: ILoadTemplate) {
    const { html, subject } = this.loadTemplate(settings);

    return this.sendMailLogic({ to, subject, html });
  }

  /**
   * Load a template to send email
   * @param settings Settings to load
   */
  public loadTemplate(settings: ILoadTemplate) {
    let subject: string;

    switch (settings.template) {
      case "tcp-signin":
        subject = "Verify Your Account on PrimeMSG";
        break;

      default:
        throw new Error("Unknow template '" + settings.template + "'");
    }

    return {
      ...this.loadTemplateLogic(settings.template, settings as unknown as Record<string, string>),
      subject
    };
  }

  /**
   * Load template file
   * @param filename Filename template HTML
   * @param replacements Replacements
   * @returns Tempalte loaded
   */
  private loadTemplateLogic(filename: string, replacements: Record<string, string>) {
    // Load file
    let templateText = readFileSync(path.join(process.cwd(), "templates", filename + ".html")).toString();

    // Prepare replacements
    const data: Record<string, string> = {
      ...replacements,
      current_year: new Date().getFullYear().toString()
    };

    // Find exact match
    const matched = templateText.match(/\{\{.+\}\}/g);

    if (matched) {
      // Replace vars
      matched.forEach((value) => {
        const keyname = value.slice(2, -2);
        templateText = templateText.replace(value, data[keyname] ?? null);
      });
    }

    return {
      html: templateText
    }
  }
}
