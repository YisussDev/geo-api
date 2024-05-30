import { Injectable } from "@nestjs/common";
import { CourseRepository } from "@domain-repositories/course/course.repository";
import {
  CourseImplementation
} from "../../../../infrastructure/adapters/db/implementation/course/course.implementation";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { CourseCreateDto, CourseEntity } from "@domain-entities/course/course.entity";

@Injectable()
export class CourseUseCaseService implements CourseRepository {


  constructor(
    private implementation: CourseImplementation
  ) {
  }

  public getAll(filter: FilterInterface, page?: number | null): Promise<HttpResponseInterface<CourseEntity>> {
    return this.implementation.getAll(filter, page);
  }

  public getOne(filter: FilterInterface): Promise<{ data: CourseEntity }> {
    return this.implementation.getOne(filter);
  }

  public create(data: CourseCreateDto): Promise<{ data: CourseEntity }> {
    return this.implementation.create(data);
  }

  public updateOne(id: string, data: CourseEntity): Promise<{ data: CourseEntity }> {
    return this.implementation.updateOne(id, data);
  }

  public deleteOne(id: string): Promise<{ data: CourseEntity }> {
    return this.implementation.deleteOne(id);
  }

  public activateOrDeactivateCourse(id: string): Promise<{ data: CourseEntity }> {
    return this.implementation.activateOrDeactivateCourse(id);
  }

}