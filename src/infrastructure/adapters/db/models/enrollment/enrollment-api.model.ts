import { CourseEntity } from "@domain-entities/course/course.entity";
import { StudentEntity } from "@domain-entities/student/student.entity";
import { CertifiedEntity } from "@domain-entities/certified/certified.entity";

export interface EnrollmentApiEntity {
  id: number;
  course: CourseEntity;
  student: StudentEntity;
  certified: CertifiedEntity;
  grade: number;
  status: "ACTIVE" | "INACTIVE";
  status_course: "UNAPPROVED" | "APPROVED";
  start_enrollment: Date;
  end_enrollment: Date;
}