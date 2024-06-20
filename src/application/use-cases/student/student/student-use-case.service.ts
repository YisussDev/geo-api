import { Injectable } from "@nestjs/common";
import { StudentRepository } from "@domain-repositories/student/student.repository";
import {
  StudentImplementation
} from "../../../../infrastructure/adapters/db/implementation/student/student.implementation";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { StudentCreateDto, StudentEntity } from "@domain-entities/student/student.entity";

@Injectable()
export class StudentUseCaseService implements StudentRepository {


  constructor(
    private implementation: StudentImplementation
  ) {
  }

  public getAll(filter: FilterInterface, page?: number | null): Promise<HttpResponseInterface<StudentEntity>> {
    return this.implementation.getAll(filter, page);
  }

  public registerStudentInCourse(studentId: number, courseId: number): Promise<{ data: StudentEntity }> {
    return this.implementation.registerStudentInCourse(studentId, courseId);
  }

  public removeStudentInCourse(studentId: number, courseId: number): Promise<{ data: StudentEntity }> {
    return this.implementation.removeStudentInCourse(studentId, courseId);
  }

  public create(data: StudentCreateDto): Promise<{ data: StudentEntity }> {
    return this.implementation.create(data);
  }

  public deleteOne(id: string): Promise<{ data: StudentEntity }> {
    return this.implementation.deleteOne(id);
  }

  public getOne(filter: FilterInterface): Promise<{ data: StudentEntity }> {
    return this.implementation.getOne(filter);
  }

}