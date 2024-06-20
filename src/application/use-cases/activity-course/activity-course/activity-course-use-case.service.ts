import { Injectable } from "@nestjs/common";
import { ActivityCourseRepository } from "@domain-repositories/activity-course/activity-course.repository";
import {
  ActivityCourseImplementation
} from "../../../../infrastructure/adapters/db/implementation/activity-course/activity-course.implementation";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { ActivityCourseCreateDto, ActivityCourseEntity } from "@domain-entities/activity-course/activity-course.entity";

@Injectable()
export class ActivityCourseUseCaseService implements ActivityCourseRepository {


  constructor(
    private implementation: ActivityCourseImplementation
  ) {
  }

  public getAll(filter: FilterInterface, page?: number | null): Promise<HttpResponseInterface<ActivityCourseEntity>> {
    return this.implementation.getAll(filter, page);
  }

  public create(data: ActivityCourseCreateDto): Promise<{ data: ActivityCourseEntity }> {
    return this.implementation.create(data);
  }

  // public updateOne(id: string, data: ActivityCourseEntity): Promise<{ data: ActivityCourseEntity }> {
  //   return this.implementation.updateOne(id, data);
  // }

  public deleteOne(id: string): Promise<{ data: ActivityCourseEntity }> {
    return this.implementation.deleteOne(id);
  }

  public async registerActivityInCourse(idActivity: string, idCourse: string, data: {
    start_date: Date,
    end_date: Date
  }): Promise<{ data: ActivityCourseEntity }> {
    return this.implementation.registerActivityInCourse(idActivity, idCourse, data);
  }

  public async removeActivityInCourse(idActivity: string, idCourse: string, data: {
    start_date: Date,
    end_date: Date
  }): Promise<{ data: ActivityCourseEntity }> {
    return this.implementation.removeActivityInCourse(idActivity, idCourse, data);
  }


}