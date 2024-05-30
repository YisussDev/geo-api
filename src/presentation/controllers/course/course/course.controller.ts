import { Headers, Body, Controller, Delete, Get, Param, Post, Patch, Req, UseGuards } from "@nestjs/common";
import { CourseUseCaseService } from "@application-use-cases/course/course/course-use-case.service";
import { CourseCreateDto, CourseEntity } from "@domain-entities/course/course.entity";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { AuthGuard } from "../../../../core/guards/auth/auth.guard";
import { ValidationGuard } from "../../../../core/guards/validation/validation.guard";
import { ActionName } from "../../../../core/decorators/name-action.decorator";
import { ModuleGuard } from "../../../../core/guards/module/module.guard";

@Controller("course")
export class CourseController {

  constructor(
    private useCases: CourseUseCaseService
  ) {
  }

  @ActionName("LIST_ALL")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Get("")
  public getAll(
    @Headers() headers: any,
    @Req() request: any
  ): Promise<HttpResponseInterface<CourseEntity>> {
    let filter: FilterInterface = {};
    if (headers["x-filter-model"]) filter = JSON.parse(headers["x-filter-model"]);
    return this.useCases.getAll(filter, request.query.page);
  }

  @Get("search")
  public getOne(
    @Req() request: any,
    @Headers() headers: any,
    @Param("id") id: string
  ): Promise<{ data: CourseEntity }> {
    let filterJson: string | undefined = headers["x-filter-model"];
    let filter: FilterInterface = filterJson && JSON.parse(filterJson);
    return this.useCases.getOne(filter);
  }

  @ActionName("CREATE")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Post("")
  public async create(
    @Body() data: CourseCreateDto
  ): Promise<{ data: CourseEntity }> {
    return this.useCases.create(data);
  }

  @ActionName("UPDATE")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Patch(":id")
  public async update(
    @Req() request: any,
    @Param("id") id: string,
    @Body() data: CourseEntity
  ): Promise<{ data: CourseEntity }> {
    return this.useCases.updateOne(id, data);
  }

  @UseGuards(AuthGuard, ValidationGuard)
  @Delete(":id")
  public async delete(
    @Param("id") id: string
  ): Promise<{ data: CourseEntity }> {
    return this.useCases.deleteOne(id);
  }

  @ActionName("ACTIVE_OR_INACTIVE")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Get("act-deact/:id")
  public async activateOrDeactivateCourse(
    @Param("id") id: string
  ): Promise<{ data: CourseEntity }> {
    return this.useCases.activateOrDeactivateCourse(id);
  }

}
