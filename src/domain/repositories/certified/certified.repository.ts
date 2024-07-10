import {CertifiedEntity, CertifiedCreateDto} from "../../entities/certified/certified.entity";
import { BaseHttpModel } from "@core-interfaces/http/base-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";

export abstract class CertifiedRepository implements BaseHttpModel<CertifiedEntity> {

  abstract getAll?(filter: FilterInterface, page?: number): Promise<HttpResponseInterface<CertifiedEntity>>;

  abstract getOne?(filter: FilterInterface): Promise<{ data: CertifiedEntity }>;

  abstract create?(data: CertifiedCreateDto): Promise<{ data : CertifiedEntity}>;

  abstract updateOne?(id: string, data: CertifiedEntity): Promise<{ data : CertifiedEntity}>;

  abstract deleteOne?(id: string): Promise<{ data : CertifiedEntity}>;

}
