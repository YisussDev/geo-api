import {
  ActivityCourseStudentRepository
} from "@domain-repositories/activity-course-student/activity-course-student.repository";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { ActivityCourseStudentMapper } from "../../mapper/activity-course-student/activity-course-student.mapper";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import {
  ActivityCourseStudentCreateDto,
  ActivityCourseStudentEntity
} from "@domain-entities/activity-course-student/activity-course-student.entity";
import { constructQuery } from "@core-helpers/query/queries.helper";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { BcryptService } from "@core-services/bcrypt/bcryp.service";
import { JwtService } from "@nestjs/jwt";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";
import { StudentEntity } from "@domain-entities/student/student.entity";
import { ActivityCourseEntity } from "@domain-entities/activity-course/activity-course.entity";
import { CourseEntity } from "@domain-entities/course/course.entity";

@Injectable()
export class ActivityCourseStudentImplementation implements ActivityCourseStudentRepository {


  private mapper = new ActivityCourseStudentMapper();

  constructor(
    private jwtService: JwtService,
    @InjectRepository(ActivityCourseStudentEntity) private readonly repository: EntityRepository<ActivityCourseStudentEntity>,
    private readonly em: EntityManager,
    private bcryptService: BcryptService,
    private mikroQueryService: MikroQueryService
  ) {
  }

  public async getAll(filter: FilterInterface, page?: number | null): Promise<HttpResponseInterface<ActivityCourseStudentEntity>> {
    if (!filter) {
      return {
        data: await this.repository.find({}, { populate: [] })
      };
    } else {
      return await this.mikroQueryService.constructResponseWithFilter<ActivityCourseStudentEntity>(this.repository, filter, page);
    }
  }

  public async getByStudentAndCourse(idStudent: string, idCourse: string): Promise<{
    data: ActivityCourseStudentEntity[]
  }> {

    const student = await this.em.findOne(StudentEntity, Number(idStudent));

    if (!student) throw new BadRequestException("Student does not exist");

    const course = await this.em.findOne(CourseEntity, Number(idCourse));

    if (!course) throw new BadRequestException("Course does not exist");

    const activityCourseStudent = await this.repository.find({
        activity_course: {
          course: {
            id: Number(idCourse)
          }
        },
        student: student
      },
      {
        populate: ["activity_course.course", "student", "activity_course.activity"]
      }
    );

    return {
      data: activityCourseStudent
    };
  }


}
