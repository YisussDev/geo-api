import {StudentEntity, StudentCreateDto} from "../../entities/student/student.entity";
import { BaseHttpModel } from "@core-interfaces/http/base-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";

export abstract class StudentRepository implements BaseHttpModel<StudentEntity> {

  abstract getAll?(filter: FilterInterface, page?: number): Promise<HttpResponseInterface<StudentEntity>>;

  abstract getOne?(filter: FilterInterface): Promise<HttpResponseInterface<StudentEntity>>;

  abstract create?(data: StudentCreateDto): Promise<{ data : StudentEntity}>;

  abstract updateOne?(id: string, data: StudentEntity): Promise<{ data : StudentEntity}>;

  abstract deleteOne?(id: string): Promise<{ data : StudentEntity}>;

}
