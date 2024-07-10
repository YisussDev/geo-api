import { Entity, ManyToOne, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { CourseEntity } from "@domain-entities/course/course.entity";
import { StudentEntity } from "@domain-entities/student/student.entity";
import { CertifiedEntity } from "@domain-entities/certified/certified.entity";

@Entity({ tableName: "Enrollment" })
export class EnrollmentEntity {

  @PrimaryKey()
  id: number;

  @ManyToOne(() => CourseEntity)
  course: CourseEntity;

  @ManyToOne(() => StudentEntity)
  student: StudentEntity;

  @Property()
  grade: number;

  @Property()
  status: "ACTIVE" | "INACTIVE";

  @Property()
  status_course: "UNAPPROVED" | "APPROVED";

  @Property({ onCreate: () => new Date(), nullable: true })
  start_enrollment: Date;

  @Property({ nullable: true })
  end_enrollment: Date;

  @Property({ nullable: true })
  deletedAt?: Date;

  @OneToOne(() => CertifiedEntity, { nullable: true })
  certified: CertifiedEntity;

}

export class EnrollmentCreateDto {
}