import { Headers, Body, Controller, Delete, Get, Param, Post, Patch, Req } from "@nestjs/common";
import { StudentUseCaseService } from "@application-use-cases/student/student/student-use-case.service";
import { StudentCreateDto, StudentEntity } from "@domain-entities/student/student.entity";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { CourseEntity } from "@domain-entities/course/course.entity";

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

  @Post("")
  public async create(
    @Body() data: StudentCreateDto
  ): Promise<{ data: StudentEntity }> {
    return this.useCases.create(data);
  }

  @Post(":studentId/course/:courseId")
  public async registerStudentInCourse(
    @Param("studentId") studentId: string,
    @Param("courseId") courseId: string
  ): Promise<StudentEntity> {
    return this.useCases.registerStudentInCourse(Number(studentId), Number(courseId));
  }

  @Delete(":id")
  public async delete(
    @Param("id") id: string
  ): Promise<{ data: StudentEntity }> {
    return this.useCases.deleteOne(id);
  }

}
