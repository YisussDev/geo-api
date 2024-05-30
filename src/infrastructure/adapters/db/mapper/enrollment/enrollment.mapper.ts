import { BaseMapperModel } from "@core-models/mapper/mapper.model";
import { EnrollmentEntity } from "@domain-entities/enrollment/enrollment.entity";
import { EnrollmentApiEntity } from "../../models/enrollment/enrollment-api.model";

export class EnrollmentMapper extends BaseMapperModel<EnrollmentEntity, EnrollmentApiEntity> {

  public mapFrom(entityApi: EnrollmentApiEntity): EnrollmentEntity {
    return entityApi as any;
  }

  public mapTo(entityLocal: EnrollmentEntity): EnrollmentApiEntity {
    return entityLocal as any;
  }

}
