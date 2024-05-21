import {GradeEntity, GradeCreateDto} from "../../entities/grade/grade.entity";
import { BaseHttpModel } from "@core-interfaces/http/base-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";

export abstract class GradeRepository implements BaseHttpModel<GradeEntity> {

  abstract getAll?(filter: FilterInterface, page?: number): Promise<HttpResponseInterface<GradeEntity>>;

  abstract getOne?(filter: FilterInterface): Promise<HttpResponseInterface<GradeEntity>>;

  abstract create?(data: GradeCreateDto): Promise<{ data : GradeEntity}>;

  abstract updateOne?(id: string, data: GradeEntity): Promise<{ data : GradeEntity}>;

  abstract deleteOne?(id: string): Promise<{ data : GradeEntity}>;

}
