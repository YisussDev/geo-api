import { Headers, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { StudentUseCaseService } from "@application-use-cases/student/student/student-use-case.service";
import { StudentEntity } from "@domain-entities/student/student.entity";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { ActionName } from "../../../../core/decorators/name-action.decorator";
import { AuthGuard } from "../../../../core/guards/auth/auth.guard";
import { ModuleGuard } from "../../../../core/guards/module/module.guard";
import { ValidationGuard } from "../../../../core/guards/validation/validation.guard";

@Controller("student")
export class StudentController {

  constructor(
    private useCases: StudentUseCaseService
  ) {
  }

  @ActionName("LIST_ALL")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Get("")
  public getAll(
    @Headers() headers: any,
    @Req() request: any
  ): Promise<HttpResponseInterface<StudentEntity>> {
    let filter: FilterInterface = {};
    if (headers["x-filter-model"]) filter = JSON.parse(headers["x-filter-model"]);
    return this.useCases.getAll(filter, request.query.page);
  }

  @ActionName("SEARCH")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Get("search")
  public getOne(
    @Headers() headers: any
  ): Promise<{ data: StudentEntity }> {
    let filterJson: string | undefined = headers["x-filter-model"];
    let filter: FilterInterface = filterJson && JSON.parse(filterJson);
    return this.useCases.getOne(filter);
  }

  @ActionName("REGISTER_IN_COURSE")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Get(":studentId/course/:courseId")
  public async registerStudentInCourse(
    @Param("studentId") studentId: string,
    @Param("courseId") courseId: string
  ): Promise<{ data: StudentEntity }> {
    return this.useCases.registerStudentInCourse(Number(studentId), Number(courseId));
  }

  @ActionName("REMOVE_IN_COURSE")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Get(":studentId/course/:courseId/remove")
  public async removeStudentInCourse(
    @Param("studentId") studentId: string,
    @Param("courseId") courseId: string
  ): Promise<{ data: StudentEntity }> {
    return this.useCases.removeStudentInCourse(Number(studentId), Number(courseId));
  }

}
