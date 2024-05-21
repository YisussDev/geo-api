import { CourseEntity } from "@domain-entities/course/course.entity";

export interface ActivityApiEntity {

  id: number;

  activityName: string;

  activityDescription: string;

  activityDate: Date;

  course: CourseEntity;

  grades: any;

  students: any;

}