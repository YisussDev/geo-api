import { BaseMapperModel } from "@core-models/mapper/mapper.model";
import { StudentEntity } from "@domain-entities/student/student.entity";
import { StudentApiEntity } from "../../models/student/student-api.model";

export class StudentMapper extends BaseMapperModel<StudentEntity, StudentApiEntity> {

  public mapFrom(entityApi: StudentApiEntity): StudentEntity {
    return entityApi as any;
  }

  public mapTo(entityLocal: StudentEntity): StudentApiEntity {
    return entityLocal as any;
  }

}
