import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { StudentEntity } from "@domain-entities/student/student.entity";
import { ActivityEntity } from "@domain-entities/activity/activity.entity";

@Entity({ tableName: "Grade" })
export class GradeEntity {

  @PrimaryKey()
  id: number;

  @Property({ type: "decimal", precision: 5, scale: 2 })
  grade: number;

  @Property({ nullable: true })
  status: "APPROVED" | "UNAPPROVED" | "SUSPEND";

  @ManyToOne(() => StudentEntity)
  student: StudentEntity;

  @Property({ nullable: true })
  deletedAt?: Date;

}

export class GradeCreateDto {
}