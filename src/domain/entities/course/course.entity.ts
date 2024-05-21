import { Collection, Entity, ManyToMany, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { StudentEntity } from "@domain-entities/student/student.entity";
import { ActivityEntity } from "@domain-entities/activity/activity.entity";

@Entity({ tableName: "Course" })
export class CourseEntity {

  @PrimaryKey()
  id: number;

  @Property()
  courseName: string;

  @Property({ type: 'text' })
  description: string;

  @Property()
  startDate: Date;

  @Property()
  endDate: Date;

  @ManyToMany(() => StudentEntity, student => student.courses, { owner: true })
  students = new Collection<StudentEntity>(this);

  @OneToMany(() => ActivityEntity, activity => activity.course)
  activities = new Collection<ActivityEntity>(this);

}

export class CourseCreateDto {}