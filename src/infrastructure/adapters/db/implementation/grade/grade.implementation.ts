import { GradeRepository } from "@domain-repositories/grade/grade.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { GradeMapper } from "../../mapper/grade/grade.mapper";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { GradeCreateDto, GradeEntity } from "@domain-entities/grade/grade.entity";
import { constructQuery } from "@core-helpers/query/queries.helper";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/core";

@Injectable()
export class GradeImplementation implements GradeRepository {


  private mapper = new GradeMapper();

  constructor(
    @InjectRepository(GradeEntity) private readonly repository: EntityRepository<GradeEntity>
  ) {
  }

  public async getAll(filter: FilterInterface, page?: number | null): Promise<HttpResponseInterface<GradeEntity>> {

    const queryConstruct = constructQuery(filter.singleQueries);

    let response: HttpResponseInterface<GradeEntity> = {
      data: []
    };

    const data = await this.repository.find(queryConstruct);
    response = {
      data: data
    };

    return response;
  }

  public async create(data: GradeCreateDto): Promise<{ data: GradeEntity }> {

    const newObject = this.repository.create(data);
    await this.repository.insert(newObject);

    return {
      data: newObject
    };
  }

  public async deleteOne(id: string): Promise<{ data: GradeEntity }> {

    const object = await this.repository.findOne({ id: Number(id) });

    if (!object) {
      throw new NotFoundException(`Grade with id ${id} not found`);
    }
    await this.repository.nativeDelete(object);

    return {
      data: object
    };

  }

}
