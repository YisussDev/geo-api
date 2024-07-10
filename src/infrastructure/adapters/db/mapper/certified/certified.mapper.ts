import { BaseMapperModel } from "@core-models/mapper/mapper.model";
import { CertifiedEntity } from "@domain-entities/certified/certified.entity";
import { CertifiedApiEntity } from "../../models/certified/certified-api.model";

export class CertifiedMapper extends BaseMapperModel<CertifiedEntity, CertifiedApiEntity> {

  public mapFrom(entityApi: CertifiedApiEntity): CertifiedEntity {
    return entityApi;
  }

  public mapTo(entityLocal: CertifiedEntity): CertifiedApiEntity {
    return entityLocal;
  }
}
