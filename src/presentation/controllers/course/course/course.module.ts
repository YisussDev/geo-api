import { Module } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { CourseImplementation } from "../../../../infrastructure/adapters/db/implementation/course/course.implementation";
import { CourseUseCaseService } from "@application-use-cases/course/course/course-use-case.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { CourseEntity } from "@domain-entities/course/course.entity";

@Module({
  imports: [
    MikroOrmModule.forFeature([CourseEntity])
  ],
  controllers: [
    CourseController
  ],
  providers: [
    CourseImplementation,
    CourseUseCaseService,
  ]
})
export class CourseModule {
}
