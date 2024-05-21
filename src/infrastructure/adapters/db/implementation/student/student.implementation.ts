import { StudentRepository } from "@domain-repositories/student/student.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { StudentMapper } from "../../mapper/student/student.mapper";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { StudentCreateDto, StudentEntity } from "@domain-entities/student/student.entity";
import { constructQuery } from "@core-helpers/query/queries.helper";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { CourseEntity } from "@domain-entities/course/course.entity";

@Injectable()
export class StudentImplementation implements StudentRepository {


  private mapper = new StudentMapper();

  constructor(
    @InjectRepository(StudentEntity) private readonly repository: EntityRepository<StudentEntity>,
    private readonly em: EntityManager
  ) {
  }

  public async getAll(filter: FilterInterface, page?: number | null): Promise<HttpResponseInterface<StudentEntity>> {

    const queryConstruct = constructQuery(filter.singleQueries);

    let response: HttpResponseInterface<StudentEntity> = {
      data: []
    };

    const data = await this.repository.find(
      queryConstruct,
      {
        populate: ["courses", "grades"]
      }
    );

    response = {
      data: data
    };

    return response;
  }

  public async registerStudentInCourse(studentId: number, courseId: number): Promise<StudentEntity> {
    const student = await this.em.findOne(StudentEntity, studentId);

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const course = await this.em.findOne(CourseEntity, courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    student.courses.add(course);

    await this.em.flush();

    return await this.em.findOne(StudentEntity, studentId, {populate: ["courses"]});
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
