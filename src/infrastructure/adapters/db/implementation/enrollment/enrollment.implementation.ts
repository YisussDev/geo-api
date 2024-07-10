import { EnrollmentRepository } from "@domain-repositories/enrollment/enrollment.repository";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { EnrollmentMapper } from "../../mapper/enrollment/enrollment.mapper";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { EnrollmentCreateDto, EnrollmentEntity } from "@domain-entities/enrollment/enrollment.entity";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { JwtService } from "@nestjs/jwt";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";
import { StudentEntity } from "@domain-entities/student/student.entity";
import { CourseEntity } from "@domain-entities/course/course.entity";
import { PdfService } from "../../../../../shared/services/pdf.service";
import { CertifiedEntity } from "@domain-entities/certified/certified.entity";

import { v4 as uuidv4 } from "uuid";

@Injectable()
export class EnrollmentImplementation implements EnrollmentRepository {


  private mapper = new EnrollmentMapper();

  constructor(
    private jwtService: JwtService,
    @InjectRepository(EnrollmentEntity) private readonly repository: EntityRepository<EnrollmentEntity>,
    private readonly em: EntityManager,
    private mikroQueryService: MikroQueryService,
    private pdfService: PdfService
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

  public async getOne(filter: FilterInterface, page?: number | null): Promise<{ data: EnrollmentEntity }> {
    if (!filter || !filter["singleQueries"]) throw new BadRequestException(`Bad filter or petition.`);

    let queries: string[][] = filter["singleQueries"];

    let relations = filter["relations"];

    let fields = filter["fields"];

    let queriesToFilter = {};

    let options = {};

    for (let query of queries) {
      queriesToFilter[query[0]] = query[2];
    }

    if (relations) options["populate"] = relations;

    if (fields) options["fields"] = fields;

    const enrollment = await this.em.findOne(EnrollmentEntity, queriesToFilter, options);

    if (!enrollment) throw new BadRequestException(`Enrollment not exist`);

    return {
      data: enrollment
    };

  }

  public async getMyEnrollments(headers: any): Promise<{ data: EnrollmentEntity[] }> {
    const [type, token] = headers["authorization"].split(" ") ?? [];
    const tokenDecoded = await this.jwtService.verify(token);
    const enrollments = await this.repository.find({
      student: tokenDecoded.student.id,
      status: "ACTIVE"
    }, { populate: ["student", "course"] });
    return {
      data: enrollments
    };
  }

  public async getMyCertified(headers: any): Promise<{ data: EnrollmentEntity[] }> {
    const [type, token] = headers["authorization"].split(" ") ?? [];
    const tokenDecoded = await this.jwtService.verify(token);
    const enrollments = await this.repository.find({
      student: tokenDecoded.student.id,
      status: "INACTIVE",
      status_course: "APPROVED"
    }, { populate: ["student", "course", "certified"] });
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

  public async approvedStudent(idStudent: string, idCourse: string): Promise<{ data: EnrollmentEntity }> {

    return this.em.transactional(async (em) => {

      const student = await this.em.findOne(StudentEntity, { id: Number(idStudent) }, { populate: ["account"] });
      if (!student) throw new NotFoundException(`Student with id ${idStudent} not found`);

      const course = await this.em.findOne(CourseEntity, { id: Number(idCourse) });
      if (!course) throw new NotFoundException(`Course with id ${idStudent} not found`);

      const enrollment = await this.em.findOne(EnrollmentEntity, { student, course });
      if (!enrollment) throw new NotFoundException(`Student with id ${idStudent} not enrollment in course.`);

      enrollment.status_course = "APPROVED";
      enrollment.status = "INACTIVE";
      enrollment.end_enrollment = new Date();

      const pathSaved = await this.pdfService.createCertified(student.account, course, enrollment);

      const newCertified = em.create(CertifiedEntity, {
        enrollment: enrollment,
        status: "VALID",
        path: pathSaved,
        token: uuidv4()
      });

      enrollment.certified = newCertified;

      await em.persistAndFlush(enrollment);
      await em.persistAndFlush(newCertified);

      return {
        data: enrollment
      };
    });


  }

  public async unapprovedStudent(idStudent: string, idCourse: string): Promise<{ data: EnrollmentEntity }> {

    const student = await this.em.findOne(StudentEntity, { id: Number(idStudent) });
    if (!student) throw new NotFoundException(`Student with id ${idStudent} not found`);

    const course = await this.em.findOne(CourseEntity, { id: Number(idCourse) });
    if (!course) throw new NotFoundException(`Course with id ${idStudent} not found`);

    const enrollment = await this.em.findOne(EnrollmentEntity, { student, course });

    if (!enrollment) throw new NotFoundException(`Student with id ${idStudent} not enrollment in course.`);

    enrollment.status_course = "UNAPPROVED";
    enrollment.status = "INACTIVE";

    await this.em.flush();

    return {
      data: enrollment
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
