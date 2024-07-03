import { Headers, Body, Controller, Delete, Get, Param, Post, Patch, Req, UseGuards } from "@nestjs/common";
import {
  ActivityCourseStudentUseCaseService
} from "@application-use-cases/activity-course-student/activity-course-student/activity-course-student-use-case.service";
import {
  ActivityCourseStudentEntity
} from "@domain-entities/activity-course-student/activity-course-student.entity";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { ActionName } from "../../../../core/decorators/name-action.decorator";
import { AuthGuard } from "../../../../core/guards/auth/auth.guard";
import { ModuleGuard } from "../../../../core/guards/module/module.guard";
import { ValidationGuard } from "../../../../core/guards/validation/validation.guard";

@Controller("activity-course-student")
export class ActivityCourseStudentController {

  constructor(
    private useCases: ActivityCourseStudentUseCaseService
  ) {
  }

  @ActionName("LIST_ALL")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Get("")
  public getAll(
    @Headers() headers: any,
    @Req() request: any
  ): Promise<HttpResponseInterface<ActivityCourseStudentEntity>> {
    let filter: FilterInterface = {};
    if (headers["x-filter-model"]) filter = JSON.parse(headers["x-filter-model"]);
    return this.useCases.getAll(filter, request.query.page);
  }

  @ActionName("ACTIVITY_BY_STUDENT_COURSE")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Get("get-activities-by-student/student/:studentId/course/:courseId")
  public getByStudentAndCourse(
    @Param("studentId") studentId: string,
    @Param("courseId") courseId: string
  ): Promise<HttpResponseInterface<ActivityCourseStudentEntity>> {
    return this.useCases.getByStudentAndCourse(studentId, courseId);
  }

  @ActionName("MY_ACTIVITY_COURSE")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Get("get-my-activities-by-course/:courseId")
  public getMyActivitiesByCourse(
    @Headers() headers: any,
    @Param("courseId") courseId: string
  ): Promise<HttpResponseInterface<ActivityCourseStudentEntity>> {
    return this.useCases.getMyActivitiesByCourse(headers, courseId);
  }

  @Get("approved/:idActivityCourseStudent")
  public approvedActivityCourseStudent(
    @Param("idActivityCourseStudent") idActivityCourseStudent: string
  ): Promise<{ data: ActivityCourseStudentEntity }> {
    return this.useCases.approvedActivityCourseStudent(idActivityCourseStudent);
  }

  @Get("unapproved/:idActivityCourseStudent")
  public unapprovedActivityCourseStudent(
    @Param("idActivityCourseStudent") idActivityCourseStudent: string
  ): Promise<{ data: ActivityCourseStudentEntity }> {
    return this.useCases.unapprovedActivityCourseStudent(idActivityCourseStudent);
  }

  @Get("pending/:idActivityCourseStudent")
  public pendingActivityCourseStudent(
    @Param("idActivityCourseStudent") idActivityCourseStudent: string
  ): Promise<{ data: ActivityCourseStudentEntity }> {
    return this.useCases.pendingActivityCourseStudent(idActivityCourseStudent);
  }

}
