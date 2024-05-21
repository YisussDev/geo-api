import { Collection, Entity, ManyToMany, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { CourseEntity } from "@domain-entities/course/course.entity";
import { GradeEntity } from "@domain-entities/grade/grade.entity";
import { ActivityEntity } from "@domain-entities/activity/activity.entity";
import { AccountEntity } from "@domain-entities/account/account.entity";

@Entity({ tableName: "Student" })
export class StudentEntity {

  @PrimaryKey()
  id: number;

  @ManyToMany(() => CourseEntity, course => course.students)
  courses = new Collection<CourseEntity>(this);

  @OneToMany(() => GradeEntity, grade => grade.student)
  grades = new Collection<GradeEntity>(this);

  @ManyToMany(() => ActivityEntity, activity => activity.students, { owner: true })
  activities = new Collection<ActivityEntity>(this);

  @OneToOne(() => AccountEntity, { nullable: true })
  account: AccountEntity;

}

export class StudentCreateDto {
}