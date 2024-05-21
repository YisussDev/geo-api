import { Injectable } from "@nestjs/common";
import { GradeRepository } from "@domain-repositories/grade/grade.repository";
import { GradeImplementation } from "../../../../infrastructure/adapters/db/implementation/grade/grade.implementation";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { GradeCreateDto, GradeEntity } from "@domain-entities/grade/grade.entity";

@Injectable()
export class GradeUseCaseService implements GradeRepository {


  constructor(
    private implementation: GradeImplementation
  ) {
  }

  public getAll(filter: FilterInterface, page?: number | null): Promise<HttpResponseInterface<GradeEntity>> {
    return this.implementation.getAll(filter, page);
  }

  public create(data: GradeCreateDto): Promise<{ data: GradeEntity }> {
    return this.implementation.create(data);
  }

  public deleteOne(id: string): Promise<{ data: GradeEntity }> {
    return this.implementation.deleteOne(id);
  }

}