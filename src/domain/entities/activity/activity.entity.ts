import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ActivityCourseEntity } from "@domain-entities/activity-course/activity-course.entity";
import { IsString } from "class-validator";

@Entity({ tableName: "Activity" })
export class ActivityEntity {

  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property({type: 'text'})
  description: string;

  @Property({ type: "text", nullable: true })
  type_receivable: "DOCUMENT" | "TEST" | "NORMAL" | null;

  @Property({ type: "text" })
  type_qualification: "SCORE" | "NORMAL";

  @Property({ nullable: true })
  score_accept: number;

  @Property({ type: "json", nullable: true })
  config_test: JSON | string | null;

  @Property({ type: "json", nullable: true })
  config_doc: JSON | string | null;

  @Property({ type: "json", nullable: true })
  sections: JSON | string | null;

  @Property({ type: "json", nullable: true })
  material_help: JSON | string | null;

  @OneToMany(() => ActivityCourseEntity, activityCourse => activityCourse.activity)
  activities_courses = new Collection<ActivityCourseEntity>(this);

  @Property({ onCreate: () => new Date(), nullable: true })
  created_at: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date(), nullable: true })
  updated_at: Date;

  @Property({ nullable: true })
  deletedAt?: Date;

}

export class ActivityCreateDto {

  @IsString()
  title: string;

  @IsString()
  description: string;

}