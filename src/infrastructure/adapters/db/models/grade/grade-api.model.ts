import { StudentEntity } from "@domain-entities/student/student.entity";
import { ActivityEntity } from "@domain-entities/activity/activity.entity";

export interface GradeApiEntity {

  id: number;

  grade: number;

  status: "APPROVED" | "UNAPPROVED" | "SUSPEND";

  student: StudentEntity;

  activity: ActivityEntity;

}