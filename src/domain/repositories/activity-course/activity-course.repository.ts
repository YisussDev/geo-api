import { ActivityCourseEntity, ActivityCourseCreateDto } from "../../entities/activity-course/activity-course.entity";
import { BaseHttpModel } from "@core-interfaces/http/base-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";

export abstract class ActivityCourseRepository implements BaseHttpModel<ActivityCourseEntity> {

  abstract getAll?(filter: FilterInterface, page?: number): Promise<HttpResponseInterface<ActivityCourseEntity>>;

  abstract getOne?(filter: FilterInterface): Promise<{ data: ActivityCourseEntity }>;

  abstract create?(data: ActivityCourseCreateDto): Promise<{ data: ActivityCourseEntity }>;

  abstract updateOne?(id: string, data: ActivityCourseEntity): Promise<{ data: ActivityCourseEntity }>;

  abstract deleteOne?(id: string): Promise<{ data: ActivityCourseEntity }>;

}
