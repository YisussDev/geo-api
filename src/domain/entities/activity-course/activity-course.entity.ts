import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { ActivityEntity } from "@domain-entities/activity/activity.entity";
import { CourseEntity } from "@domain-entities/course/course.entity";

@Entity({ tableName: "ActivityCourse" })
export class ActivityCourseEntity {

  @PrimaryKey()
  id: number;

  @Property()
  status: "ACTIVE" | "INACTIVE" | "PAUSED" | "EXPIRED";

  @Property({ onCreate: () => new Date(), nullable: true })
  start_activity: Date;

  @Property({ onCreate: () => new Date(), nullable: true })
  end_activity: Date;

  @Property({ nullable: true })
  position: number | null;

  @ManyToOne(() => ActivityEntity)
  activity: ActivityEntity;

  @ManyToOne(()=> CourseEntity)
  course: CourseEntity

}

export class ActivityCourseCreateDto {
}