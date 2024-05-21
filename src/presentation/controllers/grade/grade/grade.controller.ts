import { Headers, Body, Controller, Delete, Get, Param, Post, Patch, Req } from "@nestjs/common";
import { GradeUseCaseService } from "@application-use-cases/grade/grade/grade-use-case.service";
import { GradeCreateDto, GradeEntity } from "@domain-entities/grade/grade.entity";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";

@Controller("grade")
export class GradeController {

  constructor(
    private useCases: GradeUseCaseService
  ) {
  }

  @Get("")
  public getAll(
    @Headers() headers: any,
    @Req() request: any
  ): Promise<HttpResponseInterface<GradeEntity>> {
    let filter: FilterInterface = {};
    if (headers["x-filter-model"]) filter = JSON.parse(headers["x-filter-model"]);
    return this.useCases.getAll(filter, request.query.page);
  }

  @Post("")
  public async create(
    @Body() data: GradeCreateDto
  ): Promise<{ data: GradeEntity }> {
    return this.useCases.create(data);
  }

  @Delete(":id")
  public async delete(
    @Param("id") id: string
  ): Promise<{ data: GradeEntity }> {
    return this.useCases.deleteOne(id);
  }

}
