import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { StudentEntity } from "@domain-entities/student/student.entity";
import { ActivityCourseEntity } from "@domain-entities/activity-course/activity-course.entity";

@Entity({ tableName: "ActivityCourseStudent" })
export class ActivityCourseStudentEntity {

  @PrimaryKey()
  id: number;

  @Property()
  qualification: number;

  @Property()
  status: "ACTIVE" | "INACTIVE";

  @Property({ type: "json", nullable: true })
  receivable: any;

  @Property({ type: "json", nullable: true })
  qualification_test: JSON;

  @ManyToOne(() => ActivityCourseEntity)
  activity_course: ActivityCourseEntity;

  @ManyToOne(() => StudentEntity)
  student: StudentEntity;

}

export class ActivityCourseStudentCreateDto {
}