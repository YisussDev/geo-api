import { Injectable } from "@nestjs/common";
import { EnrollmentRepository } from "@domain-repositories/enrollment/enrollment.repository";
import {
  EnrollmentImplementation
} from "../../../../infrastructure/adapters/db/implementation/enrollment/enrollment.implementation";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { EnrollmentCreateDto, EnrollmentEntity } from "@domain-entities/enrollment/enrollment.entity";

@Injectable()
export class EnrollmentUseCaseService implements EnrollmentRepository {


  constructor(
    private implementation: EnrollmentImplementation
  ) {
  }

  public getAll(filter: FilterInterface, page?: number | null): Promise<HttpResponseInterface<EnrollmentEntity>> {
    return this.implementation.getAll(filter, page);
  }

  public getMyEnrollments(headers: any): Promise<{ data: EnrollmentEntity[] }> {
    return this.implementation.getMyEnrollments(headers);
  }

  public create(data: EnrollmentCreateDto): Promise<{ data: EnrollmentEntity }> {
    return this.implementation.create(data);
  }

  public deleteOne(id: string): Promise<{ data: EnrollmentEntity }> {
    return this.implementation.deleteOne(id);
  }

}