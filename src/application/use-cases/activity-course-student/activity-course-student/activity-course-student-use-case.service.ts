import { Injectable } from "@nestjs/common";
import {
  ActivityCourseStudentRepository
} from "@domain-repositories/activity-course-student/activity-course-student.repository";
import {
  ActivityCourseStudentImplementation
} from "../../../../infrastructure/adapters/db/implementation/activity-course-student/activity-course-student.implementation";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import {
  ActivityCourseStudentCreateDto,
  ActivityCourseStudentEntity
} from "@domain-entities/activity-course-student/activity-course-student.entity";

@Injectable()
export class ActivityCourseStudentUseCaseService implements ActivityCourseStudentRepository {


  constructor(
    private implementation: ActivityCourseStudentImplementation
  ) {
  }

  public getAll(filter: FilterInterface, page?: number | null): Promise<HttpResponseInterface<ActivityCourseStudentEntity>> {
    return this.implementation.getAll(filter, page);
  }

  public getByStudentAndCourse(idStudent: string, idCourse: string): Promise<HttpResponseInterface<ActivityCourseStudentEntity>> {
    return this.implementation.getByStudentAndCourse(idStudent, idCourse);
  }

  public getMyActivitiesByCourse(headers: any, idCourse: string): Promise<HttpResponseInterface<ActivityCourseStudentEntity>> {
    return this.implementation.getMyActivitiesByCourse(headers, idCourse);
  }

  public approvedActivityCourseStudent(idActivityCourseStudent: string): Promise<{
    data: ActivityCourseStudentEntity
  }> {
    return this.implementation.approvedActivityCourseStudent(idActivityCourseStudent);
  }

  public unapprovedActivityCourseStudent(idActivityCourseStudent: string): Promise<{
    data: ActivityCourseStudentEntity
  }> {
    return this.implementation.unapprovedActivityCourseStudent(idActivityCourseStudent);
  }

  public pendingActivityCourseStudent(idActivityCourseStudent: string): Promise<{
    data: ActivityCourseStudentEntity
  }> {
    return this.implementation.pendingActivityCourseStudent(idActivityCourseStudent);
  }

}