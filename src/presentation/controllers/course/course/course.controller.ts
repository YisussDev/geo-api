import { Headers, Body, Controller, Delete, Get, Param, Post, Patch, Req } from "@nestjs/common";
import { CourseUseCaseService } from "@application-use-cases/course/course/course-use-case.service";
import { CourseCreateDto, CourseEntity } from "@domain-entities/course/course.entity";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";

@Controller("course")
export class CourseController {

  constructor(
    private useCases: CourseUseCaseService
  ) {
  }

  @Get("")
  public getAll(
    @Headers() headers: any,
    @Req() request: any
  ): Promise<HttpResponseInterface<CourseEntity>> {
    let filter: FilterInterface = {};
    if (headers["x-filter-model"]) filter = JSON.parse(headers["x-filter-model"]);
    return this.useCases.getAll(filter, request.query.page);
  }

  @Post("")
  public async create(
    @Body() data: CourseCreateDto
  ): Promise<{ data: CourseEntity }> {
    return this.useCases.create(data);
  }

  @Delete(":id")
  public async delete(
    @Param("id") id: string
  ): Promise<{ data: CourseEntity }> {
    return this.useCases.deleteOne(id);
  }

}
