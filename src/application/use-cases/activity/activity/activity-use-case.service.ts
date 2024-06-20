import { Injectable } from "@nestjs/common";
import { ActivityRepository } from "@domain-repositories/activity/activity.repository";
import {
  ActivityImplementation
} from "../../../../infrastructure/adapters/db/implementation/activity/activity.implementation";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { ActivityCreateDto, ActivityEntity } from "@domain-entities/activity/activity.entity";

@Injectable()
export class ActivityUseCaseService implements ActivityRepository {


  constructor(
    private implementation: ActivityImplementation
  ) {
  }

  public getAll(filter?: FilterInterface, page?: number | null): Promise<HttpResponseInterface<ActivityEntity>> {
    return this.implementation.getAll(filter, page);
  }

  public getOne(filter: FilterInterface): Promise<{ data: ActivityEntity }> {
    return this.implementation.getOne(filter);
  }

  public create(data: ActivityCreateDto): Promise<{ data: ActivityEntity }> {
    return this.implementation.create(data);
  }

  public updateOne(id: string, data: ActivityEntity): Promise<{ data: ActivityEntity }> {
    return this.implementation.updateOne(id, data);
  }

  public deleteOne(id: string): Promise<{ data: ActivityEntity }> {
    return this.implementation.deleteOne(id);
  }

}