import { Collection, Entity, Enum, ManyToMany, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { ActivityEntity } from "@domain-entities/activity/activity.entity";
import { EnrollmentEntity } from "@domain-entities/enrollment/enrollment.entity";
import { IsJSON, IsString } from "class-validator";

@Entity({ tableName: "Course" })
export class CourseEntity {

  @PrimaryKey()
  id: number;

  @Property({ type: "json", nullable: true })
  img_64: Record<string, any>;

  @Property()
  courseName: string;

  @Property({ type: "text" })
  description: string;

  @Enum(() => CourseStatus)
  status: "ACTIVE" | "INACTIVE";

  // @Property()
  // startDate: Date;
  //
  // @Property()
  // endDate: Date;

  @Property({ onCreate: () => new Date(), nullable: true })
  created_at!: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date(), nullable: true })
  updated_at!: Date;

  @OneToMany(() => ActivityEntity, activity => activity.course)
  activities = new Collection<ActivityEntity>(this);

  @OneToMany(() => EnrollmentEntity, enrollment => enrollment.course)
  enrollments = new Collection<EnrollmentEntity>(this);

}

export class CourseCreateDto {

  @IsString()
  courseName: string;

  @IsString()
  description: string;

}

export enum CourseStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}