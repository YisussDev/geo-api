import { CourseRepository } from "@domain-repositories/course/course.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CourseMapper } from "../../mapper/course/course.mapper";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { CourseCreateDto, CourseEntity } from "@domain-entities/course/course.entity";
import { constructQuery } from "@core-helpers/query/queries.helper";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/core";

@Injectable()
export class CourseImplementation implements CourseRepository {


  private mapper = new CourseMapper();

  constructor(
    @InjectRepository(CourseEntity) private readonly repository: EntityRepository<CourseEntity>
  ) {
  }

  public async getAll(filter: FilterInterface, page?: number | null): Promise<HttpResponseInterface<CourseEntity>> {

    const queryConstruct = constructQuery(filter.singleQueries);

    let response: HttpResponseInterface<CourseEntity> = {
      data: []
    };

    const data = await this.repository.find(queryConstruct, { populate: ["students", "activities"] });
    response = {
      data: data
    };

    return response;
  }

  public async create(data: CourseCreateDto): Promise<{ data: CourseEntity }> {

    const newObject = this.repository.create(data);
    await this.repository.insert(newObject);

    return {
      data: newObject
    };
  }

  public async deleteOne(id: string): Promise<{ data: CourseEntity }> {

    const object = await this.repository.findOne({ id: Number(id) });

    if (!object) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    await this.repository.nativeDelete(object);

    return {
      data: object
    };

  }

}
