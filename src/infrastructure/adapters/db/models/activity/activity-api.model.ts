import { ActivityCourseEntity } from "@domain-entities/activity-course/activity-course.entity";

export interface ActivityApiEntity {

  id: number;

  title: string;

  description: string;

  type_receivable: "DOCUMENT" | "TEST" | "NORMAL" | null;

  type_qualification: "SCORE" | "NORMAL";

  score_accept: number;

  config_test: JSON | string | null;

  config_doc: JSON | string | null;

  sections: JSON | string | null;

  material_help: JSON | string | null;

  activities_courses: any;

  created_at: Date;

  updated_at: Date;

}