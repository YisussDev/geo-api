import { BaseMapperModel } from "@core-models/mapper/mapper.model";
import { ActivityCourseStudentEntity } from "@domain-entities/activity-course-student/activity-course-student.entity";
import { ActivityCourseStudentApiEntity } from "../../models/activity-course-student/activity-course-student-api.model";

export class ActivityCourseStudentMapper extends BaseMapperModel<ActivityCourseStudentEntity, ActivityCourseStudentApiEntity> {

  public mapFrom(entityApi: ActivityCourseStudentApiEntity): ActivityCourseStudentEntity {
    return entityApi;
  }

  public mapTo(entityLocal: ActivityCourseStudentEntity): ActivityCourseStudentApiEntity {
    return entityLocal;
  }

}
