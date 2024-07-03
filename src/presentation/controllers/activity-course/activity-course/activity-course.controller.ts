import { Headers, Body, Controller, Delete, Get, Param, Post, Patch, Req, UseGuards } from "@nestjs/common";
import {
  ActivityCourseUseCaseService
} from "@application-use-cases/activity-course/activity-course/activity-course-use-case.service";
import { ActivityCourseCreateDto, ActivityCourseEntity } from "@domain-entities/activity-course/activity-course.entity";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { ActionName } from "../../../../core/decorators/name-action.decorator";
import { AuthGuard } from "../../../../core/guards/auth/auth.guard";
import { ModuleGuard } from "../../../../core/guards/module/module.guard";
import { ValidationGuard } from "../../../../core/guards/validation/validation.guard";

@Controller("activity-course")
export class ActivityCourseController {

  constructor(
    private useCases: ActivityCourseUseCaseService
  ) {
  }

  @ActionName("LIST_ALL")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Get("")
  public getAll(
    @Headers() headers: any,
    @Req() request: any
  ): Promise<HttpResponseInterface<ActivityCourseEntity>> {
    let filter: FilterInterface = {};
    if (headers["x-filter-model"]) filter = JSON.parse(headers["x-filter-model"]);
    return this.useCases.getAll(filter, request.query.page);
  }

  @ActionName("CREATE")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Post("")
  public async create(
    @Body() data: ActivityCourseCreateDto
  ): Promise<{ data: ActivityCourseEntity }> {
    return this.useCases.create(data);
  }

  @Delete(":id")
  public async delete(
    @Param("id") id: string
  ): Promise<{ data: ActivityCourseEntity }> {
    return this.useCases.deleteOne(id);
  }

  @ActionName("REGISTER")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
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

  @ActionName("REMOVE")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
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
