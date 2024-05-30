import { Headers, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { StudentUseCaseService } from "@application-use-cases/student/student/student-use-case.service";
import { StudentEntity } from "@domain-entities/student/student.entity";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";

@Controller("student")
export class StudentController {

  constructor(
    private useCases: StudentUseCaseService
  ) {
  }


  @Get("")
  public getAll(
    @Headers() headers: any,
    @Req() request: any
  ): Promise<HttpResponseInterface<StudentEntity>> {
    let filter: FilterInterface = {};
    if (headers["x-filter-model"]) filter = JSON.parse(headers["x-filter-model"]);
    return this.useCases.getAll(filter, request.query.page);
  }

  @Get("search")
  public getOne(
    @Headers() headers: any,
  ): Promise<{ data: StudentEntity }> {
    let filterJson: string | undefined = headers["x-filter-model"];
    let filter: FilterInterface = filterJson && JSON.parse(filterJson);
    return this.useCases.getOne(filter);
  }

  @Get(":studentId/course/:courseId")
  public async registerStudentInCourse(
    @Param("studentId") studentId: string,
    @Param("courseId") courseId: string
  ): Promise<{ data: StudentEntity }> {
    return this.useCases.registerStudentInCourse(Number(studentId), Number(courseId));
  }

}
