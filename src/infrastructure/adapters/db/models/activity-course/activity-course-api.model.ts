import { ActivityEntity } from "@domain-entities/activity/activity.entity";
import { CourseEntity } from "@domain-entities/course/course.entity";

export interface ActivityCourseApiEntity {

  id: number;

  status: "ACTIVE" | "INACTIVE" | "PAUSED" | "EXPIRED";

  start_activity: Date;

  end_activity: Date;

  position: number | null;

  activity: ActivityEntity;

  course: CourseEntity;

}