import { ActivityRepository } from "@domain-repositories/activity/activity.repository";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ActivityMapper } from "../../mapper/activity/activity.mapper";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { ActivityCreateDto, ActivityEntity } from "@domain-entities/activity/activity.entity";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { JwtService } from "@nestjs/jwt";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";

@Injectable()
export class ActivityImplementation implements ActivityRepository {


  private mapper = new ActivityMapper();

  constructor(
    @InjectRepository(ActivityEntity) private readonly repository: EntityRepository<ActivityEntity>,
    private jwtService: JwtService,
    private readonly em: EntityManager,
    private mikroQueryService: MikroQueryService
  ) {
  }

  public async getAll(filter?: FilterInterface, page?: number | null): Promise<HttpResponseInterface<ActivityEntity>> {
    if (!filter) {
      return {
        data: await this.repository.find({}, { populate: ["activities_courses"] })
      };
    } else {
      return await this.mikroQueryService.constructResponseWithFilter<ActivityEntity>(this.repository, filter, page);
    }
  }

  public async getOne(filter: FilterInterface): Promise<{ data: ActivityEntity }> {

    if (!filter || !filter["singleQueries"]) throw new BadRequestException(`Bad filter or petition.`);

    let queries: string[][] = filter["singleQueries"];

    let relations = filter["relations"];

    let queriesToFilter = {};

    let options = {};

    for (let query of queries) {
      queriesToFilter[query[0]] = query[2];
    }

    if (relations) options["populate"] = relations;

    const activity = await this.em.findOne(ActivityEntity, queriesToFilter, options);

    if (!activity) throw new BadRequestException(`Activity not exist`);

    return {
      data: activity
    };

  }

  public async create(data: ActivityCreateDto): Promise<{ data: ActivityEntity }> {

    const newObject = this.repository.create(data);
    await this.repository.insert(newObject);

    return {
      data: newObject
    };
  }

  public async updateOne(id: string, data: ActivityEntity): Promise<{ data: ActivityEntity }> {
    const activity = await this.repository.findOne({ id: Number(id) });
    if (!activity) {
      throw new Error("Activity not found");
    } else {
      // @ts-ignore
      this.repository.assign(activity, data);
      await this.em.flush();
      return {
        data: activity
      };
    }
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
