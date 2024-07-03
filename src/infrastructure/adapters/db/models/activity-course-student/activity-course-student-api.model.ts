import { ActivityCourseEntity } from "@domain-entities/activity-course/activity-course.entity";
import { StudentEntity } from "@domain-entities/student/student.entity";

export interface ActivityCourseStudentApiEntity {

  id: number;

  qualification: number;

  status: "APPROVED" | "UNAPPROVED" | "PENDING";

  receivable: JSON;

  qualification_test: JSON;

  activity_course: ActivityCourseEntity;

  activity_course_id: number;

  student: StudentEntity;

}