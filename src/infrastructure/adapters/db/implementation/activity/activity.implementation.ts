import { ActivityRepository } from "@domain-repositories/activity/activity.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ActivityMapper } from "../../mapper/activity/activity.mapper";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { ActivityCreateDto, ActivityEntity } from "@domain-entities/activity/activity.entity";
import { constructQuery } from "@core-helpers/query/queries.helper";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/core";

@Injectable()
export class ActivityImplementation implements ActivityRepository {


  private mapper = new ActivityMapper();

  constructor(
    @InjectRepository(ActivityEntity) private readonly repository: EntityRepository<ActivityEntity>
  ) {
  }

  public async getAll(filter: FilterInterface, page?: number | null): Promise<HttpResponseInterface<ActivityEntity>> {

    const queryConstruct = constructQuery(filter.singleQueries);

    let response: HttpResponseInterface<ActivityEntity> = {
      data: []
    };

    const data = await this.repository.find(queryConstruct);
    response = {
      data: data
    };

    return response;
  }

  public async create(data: ActivityCreateDto): Promise<{ data: ActivityEntity }> {

    const newObject = this.repository.create(data);
    await this.repository.insert(newObject);

    return {
      data: newObject
    };
  }

  public async deleteOne(id: string): Promise<{ data: ActivityEntity }> {

    const object = await this.repository.findOne({ id: Number(id) });

    if (!object) {
      throw new NotFoundException(`Activity with id ${id} not found`);
    }
    await this.repository.nativeDelete(object);

    return {
      data: object
    };

  }

}
