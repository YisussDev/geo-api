import { Injectable } from "@nestjs/common";
import { CertifiedRepository } from "@domain-repositories/certified/certified.repository";
import { CertifiedImplementation } from "../../../../infrastructure/adapters/db/implementation/certified/certified.implementation";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { CertifiedCreateDto, CertifiedEntity } from "@domain-entities/certified/certified.entity";

@Injectable()
export class CertifiedUseCaseService {


  constructor(
    private implementation: CertifiedImplementation
  ) {
  }

  public async getCertifiedByToken(token: string): Promise<CertifiedEntity> {
    return this.implementation.getCertifiedByToken(token);
  }

}