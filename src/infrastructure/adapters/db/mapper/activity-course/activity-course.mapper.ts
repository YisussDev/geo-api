import { BaseMapperModel } from "@core-models/mapper/mapper.model";
import { ActivityCourseEntity } from "@domain-entities/activity-course/activity-course.entity";
import { ActivityCourseApiEntity } from "../../models/activity-course/activity-course-api.model";

export class ActivityCourseMapper extends BaseMapperModel<ActivityCourseEntity, ActivityCourseApiEntity> {

  public mapFrom(entityApi: ActivityCourseApiEntity): ActivityCourseEntity {
    return entityApi;
  }

  public mapTo(entityLocal: ActivityCourseEntity): ActivityCourseApiEntity {
    return entityLocal;
  }

}
