import { Headers, Body, Controller, Delete, Get, Param, Post, Patch, Req } from "@nestjs/common";
import {
  ActivityCourseStudentUseCaseService
} from "@application-use-cases/activity-course-student/activity-course-student/activity-course-student-use-case.service";
import {
  ActivityCourseStudentEntity
} from "@domain-entities/activity-course-student/activity-course-student.entity";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";

@Controller("activity-course-student")
export class ActivityCourseStudentController {

  constructor(
    private useCases: ActivityCourseStudentUseCaseService
  ) {
  }

  @Get("")
  public getAll(
    @Headers() headers: any,
    @Req() request: any
  ): Promise<HttpResponseInterface<ActivityCourseStudentEntity>> {
    let filter: FilterInterface = {};
    if (headers["x-filter-model"]) filter = JSON.parse(headers["x-filter-model"]);
    return this.useCases.getAll(filter, request.query.page);
  }

  @Get("get-activities-by-student/student/:studentId/course/:courseId")
  public getByStudentAndCourse(
    @Param("studentId") studentId: string,
    @Param("courseId") courseId: string
  ): Promise<HttpResponseInterface<ActivityCourseStudentEntity>> {
    return this.useCases.getByStudentAndCourse(studentId, courseId);
  }

}
