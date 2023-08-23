import * as dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
const exphbs = require('exphbs');
const { resolve } = require('path');

dotenv.config();

export default class EmailService {
  transporter: any;

  constructor(rootDir: string | null) {
    this.transporter = nodemailer.createTransport({
      port: Number(process.env.EMAIL_PORT),
      host: process.env.EMAIL_SMTP,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: true,
    });

    if (rootDir) {
      const viewPath = resolve(rootDir, 'services', 'email', 'views');
      console.log(viewPath);
      this.transporter.use(
        'compile',
        hbs({
          viewEngine: exphbs.create({
            defaultLayout: 'dafault',
            extname: '.hbs',
          }),
          viewPath,
          extName: '.hbs',
        }),
      );
    }
  }

  public async sendEmail(
    to: string,
    subject: string,
    template: any,
    context: any,
  ) {
    const data = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      template,
      context,
    };
    try {
      return await this.transporter.sendMail(data);
    } catch (error) {
      throw error;
    }
  }
}
