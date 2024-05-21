import { Headers, Body, Controller, Delete, Get, Param, Post, Patch, Req } from "@nestjs/common";
import { ActivityUseCaseService } from "@application-use-cases/activity/activity/activity-use-case.service";
import { ActivityCreateDto, ActivityEntity } from "@domain-entities/activity/activity.entity";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";

@Controller("activity")
export class ActivityController {

  constructor(
    private useCases: ActivityUseCaseService
  ) {
  }

  @Get("")
  public getAll(
    @Headers() headers: any,
    @Req() request: any
  ): Promise<HttpResponseInterface<ActivityEntity>> {
    let filter: FilterInterface = {};
    if (headers["x-filter-model"]) filter = JSON.parse(headers["x-filter-model"]);
    return this.useCases.getAll(filter, request.query.page);
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
