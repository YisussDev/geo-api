import { Controller, Get, Param, Res } from "@nestjs/common";
import { CertifiedUseCaseService } from "@application-use-cases/certified/certified/certified-use-case.service";
import { Response } from "express";
import * as fs from "fs";

@Controller("certified")
export class CertifiedController {

  constructor(
    private useCases: CertifiedUseCaseService
  ) {
  }

  @Get(":tokenCertified")
  public async getCertifiedById(
    @Param("tokenCertified") tokenCertified: string,
    @Res() response: Response
  ): Promise<void> {

    const certifiedFounded = await this.useCases.getCertifiedByToken(tokenCertified);

    const pdfBuffer = fs.readFileSync(certifiedFounded.path);

    response.setHeader("Content-Type", "application/pdf");
    response.setHeader("Content-Disposition", "attachment; filename=certified.pdf");
    response.send(pdfBuffer);
  }


}
