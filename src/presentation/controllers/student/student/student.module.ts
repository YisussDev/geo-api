import { MiddlewareConsumer, Module } from "@nestjs/common";
import { StudentController } from "./student.controller";
import { StudentImplementation } from "../../../../infrastructure/adapters/db/implementation/student/student.implementation";
import { StudentUseCaseService } from "@application-use-cases/student/student/student-use-case.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { StudentEntity } from "@domain-entities/student/student.entity";
import { createAddNameMiddleware } from "../../../../core/middlewares/name-module.middleware";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";

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
    MikroQueryService
  ]
})
export class StudentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createAddNameMiddleware("STUDENT"))
      .forRoutes(StudentController);
  }
}
