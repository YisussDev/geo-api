import { CourseRepository } from "@domain-repositories/course/course.repository";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CourseMapper } from "../../mapper/course/course.mapper";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { CourseCreateDto, CourseEntity } from "@domain-entities/course/course.entity";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { JwtService } from "@nestjs/jwt";
import { BcryptService } from "@core-services/bcrypt/bcryp.service";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";

@Injectable()
export class CourseImplementation implements CourseRepository {


  private mapper = new CourseMapper();

  constructor(
    @InjectRepository(CourseEntity) private readonly repository: EntityRepository<CourseEntity>,
    private jwtService: JwtService,
    private readonly em: EntityManager,
    private bcryptService: BcryptService,
    private mikroQueryService: MikroQueryService
  ) {
  }

  public async getAll(filter: FilterInterface, page?: number | null): Promise<HttpResponseInterface<CourseEntity>> {
    if (!filter) {
      return {
        data: await this.repository.find({}, { populate: [] })
      };
    } else {
      return await this.mikroQueryService.constructResponseWithFilter<CourseEntity>(this.repository, filter, page);
    }
  }

  public async getOne(filter: FilterInterface): Promise<{ data: CourseEntity }> {

    if (!filter || !filter["singleQueries"]) throw new BadRequestException(`Bad filter or petition.`);

    let queries: string[][] = filter["singleQueries"];

    let relations = filter["relations"];

    let queriesToFilter = {};

    let options = {};

    for (let query of queries) {
      queriesToFilter[query[0]] = query[2];
    }

    if (relations) options["populate"] = relations;

    const course = await this.em.findOne(CourseEntity, queriesToFilter, options);

    if (!course) throw new BadRequestException(`Course not exist`);

    return {
      data: course
    };

  }

  public async create(data: CourseCreateDto): Promise<{ data: CourseEntity }> {

    const newObject = this.repository.create(data);

    newObject.created_at = new Date();
    newObject.updated_at = new Date();
    newObject.status = "ACTIVE";

    await this.repository.insert(newObject);

    return {
      data: newObject
    };
  }

  public async updateOne(id: string, data: CourseEntity): Promise<{ data: CourseEntity }> {
    const course = await this.repository.findOne({ id: Number(id) });
    if (!course) {
      throw new Error("Course not found");
    } else {
      // @ts-ignore
      this.repository.assign(course, data);
      await this.em.flush();
      return {
        data: course
      };
    }
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

  public async activateOrDeactivateCourse(id: string): Promise<{ data: CourseEntity }> {

    const course = await this.repository.findOne({ id: Number(id) }, { populate: ["enrollments"] });
    if (!course) {
      throw new Error("Couse not found");
    } else {
      if (course.status == "ACTIVE") {
        this.repository.assign(course, { status: "INACTIVE" });
      } else {
        this.repository.assign(course, { status: "ACTIVE" });
      }
      await this.em.flush();
      return {
        data: course
      };
    }

  }
}
