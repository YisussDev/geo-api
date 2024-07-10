import { CertifiedRepository } from "@domain-repositories/certified/certified.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CertifiedMapper } from "../../mapper/certified/certified.mapper";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { CertifiedCreateDto, CertifiedEntity } from "@domain-entities/certified/certified.entity";
import { constructQuery } from "@core-helpers/query/queries.helper";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { BcryptService } from "@core-services/bcrypt/bcryp.service";
import { JwtService } from "@nestjs/jwt";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";

@Injectable()
export class CertifiedImplementation {


  private mapper = new CertifiedMapper();

  constructor(
    @InjectRepository(CertifiedEntity) private readonly repository: EntityRepository<CertifiedEntity>,
    private readonly em: EntityManager
  ) {
  }

  public async getCertifiedByToken(token: string): Promise<CertifiedEntity> {

    const certified = await this.repository.findOne({ token: token });
    if (!certified) throw new NotFoundException("No certified");

    return certified;
  }

}
