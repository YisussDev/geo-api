import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { CourseEntity } from "@domain-entities/course/course.entity";
import { GradeEntity } from "@domain-entities/grade/grade.entity";
import { StudentEntity } from "@domain-entities/student/student.entity";

@Entity({ tableName: "Activity" })
export class ActivityEntity {

  @PrimaryKey()
  id: number;

  @Property()
  activityName: string;

  @Property({ type: "text" })
  activityDescription: string;

  @Property()
  activityDate: Date;

  @ManyToOne(() => CourseEntity)
  course: CourseEntity;

  @OneToMany(() => GradeEntity, grade => grade.activity)
  grades = new Collection<GradeEntity>(this);

  @ManyToMany(() => StudentEntity, student => student.activities)
  students = new Collection<StudentEntity>(this);

}

export class ActivityCreateDto {
}