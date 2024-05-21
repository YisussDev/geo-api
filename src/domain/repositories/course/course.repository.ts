import {CourseEntity, CourseCreateDto} from "../../entities/course/course.entity";
import { BaseHttpModel } from "@core-interfaces/http/base-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";

export abstract class CourseRepository implements BaseHttpModel<CourseEntity> {

  abstract getAll?(filter: FilterInterface, page?: number): Promise<HttpResponseInterface<CourseEntity>>;

  abstract getOne?(filter: FilterInterface): Promise<HttpResponseInterface<CourseEntity>>;

  abstract create?(data: CourseCreateDto): Promise<{ data : CourseEntity}>;

  abstract updateOne?(id: string, data: CourseEntity): Promise<{ data : CourseEntity}>;

  abstract deleteOne?(id: string): Promise<{ data : CourseEntity}>;

}
