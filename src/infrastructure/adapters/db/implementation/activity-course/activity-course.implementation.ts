import { ActivityCourseRepository } from "@domain-repositories/activity-course/activity-course.repository";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { ActivityCourseMapper } from "../../mapper/activity-course/activity-course.mapper";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { ActivityCourseCreateDto, ActivityCourseEntity } from "@domain-entities/activity-course/activity-course.entity";
import { constructQuery } from "@core-helpers/query/queries.helper";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { BcryptService } from "@core-services/bcrypt/bcryp.service";
import { JwtService } from "@nestjs/jwt";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";
import { ActivityEntity } from "@domain-entities/activity/activity.entity";
import { CourseEntity } from "@domain-entities/course/course.entity";
import { ActivityCourseStudentEntity } from "@domain-entities/activity-course-student/activity-course-student.entity";
import { EnrollmentEntity } from "@domain-entities/enrollment/enrollment.entity";

@Injectable()
export class ActivityCourseImplementation implements ActivityCourseRepository {


  private mapper = new ActivityCourseMapper();

  constructor(
    private jwtService: JwtService,
    @InjectRepository(ActivityCourseEntity) private readonly repository: EntityRepository<ActivityCourseEntity>,
    private readonly em: EntityManager,
    private bcryptService: BcryptService,
    private mikroQueryService: MikroQueryService
  ) {
  }

  public async getAll(filter: FilterInterface, page?: number | null): Promise<HttpResponseInterface<ActivityCourseEntity>> {
    if (!filter) {
      return {
        data: await this.repository.find({}, { populate: [] })
      };
    } else {
      return await this.mikroQueryService.constructResponseWithFilter<ActivityCourseEntity>(this.repository, filter, page);
    }
  }

  public async create(data: ActivityCourseCreateDto): Promise<{ data: ActivityCourseEntity }> {

    const newObject = this.repository.create(data);
    await this.repository.insert(newObject);

    return {
      data: newObject
    };
  }

  public async deleteOne(id: string): Promise<{ data: ActivityCourseEntity }> {

    const object = await this.repository.findOne(Number(id));

    if (!object) {
      throw new NotFoundException(`ActivityCourse with id ${id} not found`);
    }
    await this.repository.nativeDelete(object);

    return {
      data: object
    };

  }

  public async registerActivityInCourse(
    idActivity: string,
    idCourse: string,
    data: { start_date: Date, end_date: Date }): Promise<{ data: ActivityCourseEntity }> {

    const activity = await this.em.findOne(ActivityEntity, Number(idActivity));

    if (!activity) {
      throw new NotFoundException(`Activity with id ${idActivity} not found`);
    }

    const course = await this.em.findOne(CourseEntity, Number(idCourse));

    if (!course) {
      throw new NotFoundException(`Course with id ${idCourse} not found`);
    }

    const existActivityInCourse = await this.em.findOne(ActivityCourseEntity, { activity, course });

    if (existActivityInCourse) {
      throw new ConflictException(`Activity is already register in this course`);
    }

    const activityCourse = new ActivityCourseEntity();

    activityCourse.status = "ACTIVE";
    activityCourse.course = course;
    activityCourse.activity = activity;
    activityCourse.start_activity = data.start_date || new Date();
    activityCourse.end_activity = data.end_date || new Date();

    await this.em.persist(activityCourse);

    const enrollments = await this.em.find(EnrollmentEntity, { course: course }, { populate: ["student"] });

    for (const enrollment of enrollments) {
      const activityCourseStudent = new ActivityCourseStudentEntity();
      activityCourseStudent.activity_course = activityCourse;
      activityCourseStudent.student = enrollment.student;
      activityCourseStudent.status = "ACTIVE";
      activityCourseStudent.qualification = 0;
      activityCourseStudent.receivable = "";
      await this.em.persist(activityCourseStudent);
    }

    await this.em.flush();

    return {
      data: activityCourse
    };


  }

  public async removeActivityInCourse(
    idActivity: string,
    idCourse: string,
    data: { start_date: Date, end_date: Date }): Promise<{ data: ActivityCourseEntity }> {

    const activity = await this.em.findOne(ActivityEntity, Number(idActivity));

    if (!activity) {
      throw new NotFoundException(`Activity with id ${idActivity} not found`);
    }

    const course = await this.em.findOne(CourseEntity, Number(idCourse));

    if (!course) {
      throw new NotFoundException(`Course with id ${idCourse} not found`);
    }

    const existActivityInCourse = await this.em.findOne(ActivityCourseEntity, { activity, course });

    if (!existActivityInCourse) {
      throw new ConflictException(`Activity is not already register in this course`);
    }

    const enrollments = await this.em.find(EnrollmentEntity, { course: course }, { populate: ["student"] });

    for (const enrollment of enrollments) {
      const activityCourseStudent = await this.em.findOne(ActivityCourseStudentEntity, {
        activity_course: existActivityInCourse,
        student: enrollment.student
      });
      await this.em.remove(activityCourseStudent);
    }

    await this.em.remove(existActivityInCourse);


    await this.em.flush();

    return {
      data: existActivityInCourse
    };


  }

}
