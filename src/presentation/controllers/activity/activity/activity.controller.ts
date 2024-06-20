import { Headers, Body, Controller, Delete, Get, Param, Post, Patch, Req } from "@nestjs/common";
import { ActivityUseCaseService } from "@application-use-cases/activity/activity/activity-use-case.service";
import { ActivityCreateDto, ActivityEntity } from "@domain-entities/activity/activity.entity";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { CourseEntity } from "@domain-entities/course/course.entity";

@Controller("activity")
export class ActivityController {

  constructor(
    private useCases: ActivityUseCaseService
  ) {
  }

  @Get("")
  public getAll(
    @Req() request: any,
    @Headers() headers: any
  ): Promise<HttpResponseInterface<ActivityEntity>> {
    let filterJson: string | undefined = headers["x-filter-model"];
    let filter: FilterInterface = filterJson && JSON.parse(filterJson);
    return this.useCases.getAll(filter, request.query.page);
  }

  @Get("search")
  public getOne(
    @Req() request: any,
    @Headers() headers: any,
    @Param("id") id: string
  ): Promise<{ data: ActivityEntity }> {
    let filterJson: string | undefined = headers["x-filter-model"];
    let filter: FilterInterface = filterJson && JSON.parse(filterJson);
    return this.useCases.getOne(filter);
  }

  @Patch(":id")
  public async update(
    @Req() request: any,
    @Param("id") id: string,
    @Body() data: ActivityEntity
  ): Promise<{ data: ActivityEntity }> {
    return this.useCases.updateOne(id, data);
  }

  @Post("")
  public async create(
    @Body() data: ActivityCreateDto
  ): Promise<{ data: ActivityEntity }> {
    return this.useCases.create(data);
  }

  @Delete(":id")
  public async delete(
    @Param("id") id: string
  ): Promise<{ data: ActivityEntity }> {
    return this.useCases.deleteOne(id);
  }

}
