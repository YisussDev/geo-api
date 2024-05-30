import { EnrollmentRepository } from "@domain-repositories/enrollment/enrollment.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { EnrollmentMapper } from "../../mapper/enrollment/enrollment.mapper";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { EnrollmentCreateDto, EnrollmentEntity } from "@domain-entities/enrollment/enrollment.entity";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { BcryptService } from "@core-services/bcrypt/bcryp.service";
import { JwtService } from "@nestjs/jwt";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";

@Injectable()
export class EnrollmentImplementation implements EnrollmentRepository {


  private mapper = new EnrollmentMapper();

  constructor(
    private jwtService: JwtService,
    @InjectRepository(EnrollmentEntity) private readonly repository: EntityRepository<EnrollmentEntity>,
    private readonly em: EntityManager,
    private bcryptService: BcryptService,
    private mikroQueryService: MikroQueryService
  ) {
  }

  public async getAll(filter: FilterInterface, page?: number | null): Promise<HttpResponseInterface<EnrollmentEntity>> {
    if (!filter) {
      return {
        data: await this.repository.find({}, { populate: [] })
      };
    } else {
      return await this.mikroQueryService.constructResponseWithFilter<EnrollmentEntity>(this.repository, filter, page);
    }
  }

  public async getMyEnrollments(headers: any): Promise<{ data: EnrollmentEntity[] }> {
    const [type, token] = headers["authorization"].split(" ") ?? [];
    const tokenDecoded = await this.jwtService.verify(token);
    const enrollments = await this.repository.find({ student: tokenDecoded.student.id }, { populate: ["student", "course"] });
    return {
      data: enrollments
    };
  }

  public async create(data: EnrollmentCreateDto): Promise<{ data: EnrollmentEntity }> {

    const newObject = this.repository.create(data);
    await this.repository.insert(newObject);

    return {
      data: newObject
    };
  }

  public async deleteOne(id: string): Promise<{ data: EnrollmentEntity }> {

    const object = await this.repository.findOne(Number(id));

    if (!object) {
      throw new NotFoundException(`Enrollment with id ${id} not found`);
    }
    await this.repository.nativeDelete(object);

    return {
      data: object
    };

  }

}
