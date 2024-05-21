import { Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentImplementation } from "../../../../infrastructure/adapters/db/implementation/student/student.implementation";
import { StudentUseCaseService } from "@application-use-cases/student/student/student-use-case.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { StudentEntity } from "@domain-entities/student/student.entity";

@Module({
  imports: [
    MikroOrmModule.forFeature([StudentEntity])
  ],
  controllers: [
    StudentController
  ],
  providers: [
    StudentImplementation,
    StudentUseCaseService,
  ]
})
export class StudentModule {
}
