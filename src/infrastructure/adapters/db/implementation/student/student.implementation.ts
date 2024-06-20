import { StudentRepository } from "@domain-repositories/student/student.repository";
import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { StudentMapper } from "../../mapper/student/student.mapper";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { StudentCreateDto, StudentEntity } from "@domain-entities/student/student.entity";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { CourseEntity } from "@domain-entities/course/course.entity";
import { EnrollmentEntity } from "@domain-entities/enrollment/enrollment.entity";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";
import { ActivityCourseStudentEntity } from "@domain-entities/activity-course-student/activity-course-student.entity";

@Injectable()
export class StudentImplementation implements StudentRepository {


  private mapper = new StudentMapper();

  constructor(
    @InjectRepository(StudentEntity) private readonly repository: EntityRepository<StudentEntity>,
    private readonly em: EntityManager,
    private mikroQueryService: MikroQueryService
  ) {
  }

  public async getAll(filter?: FilterInterface, page?: number | null): Promise<HttpResponseInterface<StudentEntity>> {
    if (!filter) {
      return {
        data: await this.repository.find({}, { populate: ["enrollments"] })
      };
    } else {
      return await this.mikroQueryService.constructResponseWithFilter<StudentEntity>(this.repository, filter, page);
    }
  }

  public async getOne(filter: FilterInterface): Promise<{ data: StudentEntity }> {

    if (!filter || !filter["singleQueries"]) throw new BadRequestException(`Bad filter or petition.`);

    let queries: string[][] = filter["singleQueries"];

    let relations = filter["relations"];

    let queriesToFilter = {};

    let options = {};

    for (let query of queries) {
      queriesToFilter[query[0]] = query[2];
    }

    if (relations) options["populate"] = relations;

    const student = await this.em.findOne(StudentEntity, queriesToFilter, options);

    if (!student) throw new BadRequestException(`Student not exist`);

    return {
      data: student
    };

  }

  public async registerStudentInCourse(studentId: number, courseId: number): Promise<{ data: StudentEntity }> {
    const student = await this.em.findOne(StudentEntity, studentId, { populate: ["enrollments", "account"] });
    if (!student) {
      throw new NotFoundException("Student not found");
    }

    if (student.account.status === "INACTIVE" || student.account.validated == 0) {
      throw new NotFoundException("Student not active or validated.");
    }

    const course = await this.em.findOne(CourseEntity, courseId, { populate: ["activities_courses"] });
    if (!course) {
      throw new NotFoundException("Course not found");
    }

    const existingEnrollment = await this.em.findOne(EnrollmentEntity, { student, course });
    if (existingEnrollment) {
      throw new ConflictException("Student is already enrolled in this course");
    }


    for (const activityCourse of course.activities_courses) {
      const activityCourseStudent = new ActivityCourseStudentEntity();
      activityCourseStudent.activity_course = activityCourse;
      activityCourseStudent.student = student;
      activityCourseStudent.status = "ACTIVE";
      activityCourseStudent.qualification = 0;
      activityCourseStudent.receivable = "";
      await this.em.persist(activityCourseStudent);
    }

    const enrollment = new EnrollmentEntity();
    enrollment.course = course;
    enrollment.student = student;
    enrollment.grade = 0;
    enrollment.status = "ACTIVE";
    enrollment.status_course = "NOT_APPROVED";

    await this.em.persist(enrollment);

    await this.em.flush();

    return { data: student };
  }

  public async removeStudentInCourse(studentId: number, courseId: number): Promise<{ data: StudentEntity }> {

    const student = await this.em.findOne(StudentEntity, studentId, { populate: ["enrollments", "account"] });
    if (!student) {
      throw new NotFoundException("Student not found");
    }

    const course = await this.em.findOne(CourseEntity, courseId, { populate: ["activities_courses"] });
    if (!course) {
      throw new NotFoundException("Course not found");
    }

    const existingEnrollment = await this.em.findOne(EnrollmentEntity, { student, course });
    if (!existingEnrollment) {
      throw new ConflictException("Student is not already enrolled in this course");
    }

    for (const activityCourse of course.activities_courses) {
      const activityCourseStudent = await this.em.findOne(ActivityCourseStudentEntity, {
        student,
        activity_course: activityCourse
      });
      await this.em.remove(activityCourseStudent);
    }

    await this.em.remove(existingEnrollment);

    await this.em.flush();

    return { data: student };
  }

  public async create(data: StudentCreateDto): Promise<{ data: StudentEntity }> {

    const newObject = this.repository.create(data);
    await this.repository.insert(newObject);

    return {
      data: newObject
    };
  }

  public async deleteOne(id: string): Promise<{ data: StudentEntity }> {

    const object = await this.repository.findOne({ id: Number(id) });

    if (!object) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    await this.repository.nativeDelete(object);

    return {
      data: object
    };

  }

}
