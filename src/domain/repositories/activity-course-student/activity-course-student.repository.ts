import {ActivityCourseStudentEntity, ActivityCourseStudentCreateDto} from "../../entities/activity-course-student/activity-course-student.entity";
import { BaseHttpModel } from "@core-interfaces/http/base-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";

export abstract class ActivityCourseStudentRepository implements BaseHttpModel<ActivityCourseStudentEntity> {

  abstract getAll?(filter: FilterInterface, page?: number): Promise<HttpResponseInterface<ActivityCourseStudentEntity>>;

  abstract getOne?(filter: FilterInterface): Promise<{ data: ActivityCourseStudentEntity }>;

  abstract create?(data: ActivityCourseStudentCreateDto): Promise<{ data : ActivityCourseStudentEntity}>;

  abstract updateOne?(id: string, data: ActivityCourseStudentEntity): Promise<{ data : ActivityCourseStudentEntity}>;

  abstract deleteOne?(id: string): Promise<{ data : ActivityCourseStudentEntity}>;

}
