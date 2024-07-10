import { Injectable } from "@nestjs/common";
import * as fs from "node:fs";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { AccountEntity } from "@domain-entities/account/account.entity";
import { CourseEntity } from "@domain-entities/course/course.entity";
import { EnrollmentEntity } from "@domain-entities/enrollment/enrollment.entity";

@Injectable()
export class PdfService {

  public pathInputExample: string = "src/public/example/example.pdf";

  public pathOutputExample: string = "src/public/certifieds/";

  public positionNames: any = {
    x: 0,
    y: 272
  };

  public positionCourse: any = {
    x: 0,
    y: 179
  };

  public positionDate: any = {
    x: 0,
    y: 86
  };


  constructor() {
  }

  async modifyPdf(inputPath: string, outputPath: string, text: string, x: number, y: number): Promise<void> {
    // Cargar el archivo PDF existente
    const existingPdfBytes = fs.readFileSync(inputPath);

    // Cargar el PDF en pdf-lib
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtener la primera página del PDF
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Escribir texto sobre la primera página
    firstPage.drawText(text, {
      x,
      y,
      size: 30,
      color: rgb(0, 0, 0)
    });

    // Guardar el PDF modificado
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
  }

  async createCertified(account: AccountEntity, course: CourseEntity, enrollment: EnrollmentEntity): Promise<string> {

    const existingPdfBytes = fs.readFileSync(this.pathInputExample);

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width } = firstPage.getSize();

    const fontSize = 20;
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const names: string = account.first_name + " " + (account.last_name ? (account.last_name + " ") : ("")) + account.first_surname + (account.last_surname ? (" " + account.last_surname) : (""));

    const linesName = this.getLines(names, width, fontSize, font);

    linesName.forEach((line, index) => {
      const textWidth = font.widthOfTextAtSize(line, fontSize);
      const x = (width - textWidth) / 2;
      firstPage.drawText(line, {
        x,
        y: this.positionNames.y - index * (fontSize + 10), // Ajustar el espacio entre líneas
        size: fontSize,
        font,
        color: rgb(32 / 255, 48 / 255, 114 / 255)
      });
    });

    const linesCourse = this.getLines(course.courseName, width, fontSize, font);

    linesCourse.forEach((line, index) => {
      const textWidth = font.widthOfTextAtSize(line, fontSize);
      const x = (width - textWidth) / 2;
      firstPage.drawText(line, {
        x,
        y: this.positionCourse.y - index * (fontSize + 10), // Ajustar el espacio entre líneas
        size: fontSize,
        font,
        color: rgb(32 / 255, 48 / 255, 114 / 255)
      });
    });

    const textWidth = font.widthOfTextAtSize("09/07/2024", fontSize);
    const x = (width - textWidth) / 2;
    firstPage.drawText("09/07/2024", {
      x,
      y: this.positionDate.y,
      size: fontSize,
      font,
      color: rgb(32 / 255, 48 / 255, 114 / 255)
    });

    const pdfBytes = await pdfDoc.save();

    const pathToSave: string = this.pathOutputExample + `${enrollment.id}.pdf`;

    fs.writeFileSync(pathToSave, pdfBytes);

    return pathToSave;
  }

  private getLines(text: string, maxWidth: number, fontSize: number, font: any): string[] {
    const words: string[] = text.split(" ");
    const lines: string[] = [];
    let currentLine: string = "";

    for (const word of words) {
      const lineTest = currentLine ? `${currentLine} ${word}` : word;
      const lineWidth = font.widthOfTextAtSize(lineTest, fontSize);

      if (lineWidth < maxWidth) {
        currentLine = lineTest;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

}