import { ActivityCourseEntity } from "@domain-entities/activity-course/activity-course.entity";
import { StudentEntity } from "@domain-entities/student/student.entity";

export interface ActivityCourseStudentApiEntity {

  id: number;

  qualification: number;

  status: "ACTIVE" | "INACTIVE";

  receivable: JSON;

  qualification_test: JSON;

  activity_course: ActivityCourseEntity;

  student: StudentEntity;

}