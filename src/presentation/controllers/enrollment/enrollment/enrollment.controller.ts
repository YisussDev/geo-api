import { Headers, Body, Controller, Delete, Get, Param, Post, Patch, Req } from "@nestjs/common";
import { EnrollmentUseCaseService } from "@application-use-cases/enrollment/enrollment/enrollment-use-case.service";
import { EnrollmentCreateDto, EnrollmentEntity } from "@domain-entities/enrollment/enrollment.entity";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";

@Controller("enrollment")
export class EnrollmentController {

  constructor(
    private useCases: EnrollmentUseCaseService
  ) {
  }

  @Get("")
  public getAll(
    @Headers() headers: any,
    @Req() request: any
  ): Promise<HttpResponseInterface<EnrollmentEntity>> {
    let filter: FilterInterface = {};
    if (headers["x-filter-model"]) filter = JSON.parse(headers["x-filter-model"]);
    return this.useCases.getAll(filter, request.query.page);
  }

  @Get("approved/:idStudent/:idCourse")
  public approvedStudent(
    @Param("idStudent") idStudent: string,
    @Param("idCourse") idCourse: string
  ): Promise<{ data: EnrollmentEntity }> {
    return this.useCases.approvedStudent(idStudent, idCourse);
  }

  @Get("unapproved/:idStudent/:idCourse")
  public unapprovedStudent(
    @Param("idStudent") idStudent: string,
    @Param("idCourse") idCourse: string
  ): Promise<{ data: EnrollmentEntity }> {
    return this.useCases.unapprovedStudent(idStudent, idCourse);
  }

  @Get("my-enrollments")
  public getMyEnrollments(
    @Headers() headers: any
  ): Promise<{ data: EnrollmentEntity[] }> {
    return this.useCases.getMyEnrollments(headers);
  }

  @Post("")
  public async create(
    @Body() data: EnrollmentCreateDto
  ): Promise<{ data: EnrollmentEntity }> {
    return this.useCases.create(data);
  }

  @Delete(":id")
  public async delete(
    @Param("id") id: string
  ): Promise<{ data: EnrollmentEntity }> {
    return this.useCases.deleteOne(id);
  }

}
