import { EnrollmentEntity, EnrollmentCreateDto } from "../../entities/enrollment/enrollment.entity";
import { BaseHttpModel } from "@core-interfaces/http/base-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";

export abstract class EnrollmentRepository implements BaseHttpModel<EnrollmentEntity> {

  abstract getAll?(filter: FilterInterface, page?: number): Promise<HttpResponseInterface<EnrollmentEntity>>;

  abstract getOne?(filter: FilterInterface): Promise<{ data: EnrollmentEntity }>;

  abstract create?(data: EnrollmentCreateDto): Promise<{ data: EnrollmentEntity }>;

  abstract updateOne?(id: string, data: EnrollmentEntity): Promise<{ data: EnrollmentEntity }>;

  abstract deleteOne?(id: string): Promise<{ data: EnrollmentEntity }>;

}
