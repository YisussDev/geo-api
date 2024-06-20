import { Headers, Body, Controller, Delete, Get, Param, Post, Patch, Req } from "@nestjs/common";
import {
  ActivityCourseUseCaseService
} from "@application-use-cases/activity-course/activity-course/activity-course-use-case.service";
import { ActivityCourseCreateDto, ActivityCourseEntity } from "@domain-entities/activity-course/activity-course.entity";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";

@Controller("activity-course")
export class ActivityCourseController {

  constructor(
    private useCases: ActivityCourseUseCaseService
  ) {
  }

  @Get("")
  public getAll(
    @Headers() headers: any,
    @Req() request: any
  ): Promise<HttpResponseInterface<ActivityCourseEntity>> {
    let filter: FilterInterface = {};
    if (headers["x-filter-model"]) filter = JSON.parse(headers["x-filter-model"]);
    return this.useCases.getAll(filter, request.query.page);
  }

  @Post("")
  public async create(
    @Body() data: ActivityCourseCreateDto
  ): Promise<{ data: ActivityCourseEntity }> {
    return this.useCases.create(data);
  }

  // @Patch(":id")
  // public async update(
  //   @Param("id") id: string,
  //   @Body() data: ActivityCourseEntity
  // ): Promise<{ data: ActivityCourseEntity }> {
  //   return this.useCases.updateOne(id, data);
  // }

  @Delete(":id")
  public async delete(
    @Param("id") id: string
  ): Promise<{ data: ActivityCourseEntity }> {
    return this.useCases.deleteOne(id);
  }

  @Post("register/activity/:idActivity/course/:idCourse")
  public async registerActivityInCourse(
    @Param("idActivity") idActivity: string,
    @Param("idCourse") idCourse: string,
    @Body("start_activity") start_activity: Date,
    @Body("end_activity") end_activity: Date
  ): Promise<{ data: ActivityCourseEntity }> {
    return this.useCases.registerActivityInCourse(idActivity, idCourse, {
      start_date: start_activity,
      end_date: end_activity
    });
  }

  @Delete("remove/activity/:idActivity/course/:idCourse")
  public async removeActivityInCourse(
    @Param("idActivity") idActivity: string,
    @Param("idCourse") idCourse: string,
    @Body("start_activity") start_activity: Date,
    @Body("end_activity") end_activity: Date
  ): Promise<{ data: ActivityCourseEntity }> {
    return this.useCases.removeActivityInCourse(idActivity, idCourse, {
      start_date: start_activity,
      end_date: end_activity
    });
  }

}
