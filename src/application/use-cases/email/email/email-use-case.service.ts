import { ConflictException, Injectable } from "@nestjs/common";
import * as fs from "node:fs";
import { Transporter } from "nodemailer";
import * as nodemailer from "nodemailer";
import * as process from "node:process";


@Injectable()
export class EmailUseCaseService {


  private transporter!: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.TRANSPORT_EMAIL_USER,
        pass: process.env.TRANSPORT_EMAIL_PASSWORD
      }
    });
  }

  public async sendEmailRegister(title: string, description: string, names: string, token: string, receptor: string): Promise<string> {

    let templateHtml = fs.readFileSync("src/public/templates/register.html", "utf-8");

    templateHtml = this.replaceTextInFile(templateHtml, names, token, process.env.DOMAIN_URL_FRONT);

    const mailOptions = {
      from: "paguayjesus@gmail.com",
      to: receptor,
      subject: title,
      text: description,
      html: templateHtml,
      attachments: [
        {
          filename: "logo_geo.png",
          path: "src/public/images/logo_png_geo.png",
          cid: "logo_geo"
        }
      ]
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new ConflictException("Error al enviar el correo electrónico");
      } else {
        return "Ok";
      }
    });

    return "Ok";

  }

  private replaceTextInFile(textFile: string, names: string, token: string, domain: string): string {

    textFile = textFile.replace(/{{names}}/g, names);
    textFile = textFile.replace(/{{token}}/g, token);
    textFile = textFile.replace(/{{domain}}/g, domain);

    return textFile;
  }


}