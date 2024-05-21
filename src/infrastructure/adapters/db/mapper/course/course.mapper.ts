import { BaseMapperModel } from "@core-models/mapper/mapper.model";
import { CourseEntity } from "@domain-entities/course/course.entity";
import { CourseApiEntity } from "../../models/course/course-api.model";

export class CourseMapper extends BaseMapperModel<CourseEntity, CourseApiEntity> {

  public mapFrom(entityApi: CourseApiEntity): CourseEntity {
    return entityApi;
  }

  public mapTo(entityLocal: CourseEntity): CourseApiEntity {
    return entityLocal;
  }

}
