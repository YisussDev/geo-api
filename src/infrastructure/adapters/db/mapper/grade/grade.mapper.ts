import { BaseMapperModel } from "@core-models/mapper/mapper.model";
import { GradeEntity } from "@domain-entities/grade/grade.entity";
import { GradeApiEntity } from "../../models/grade/grade-api.model";

export class GradeMapper extends BaseMapperModel<GradeEntity, GradeApiEntity> {

  public mapFrom(entityApi: GradeApiEntity): GradeEntity {
    return entityApi;
  }

  public mapTo(entityLocal: GradeEntity): GradeApiEntity {
    return entityLocal;
  }

}
