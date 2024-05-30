import { MiddlewareConsumer, Module } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { CourseImplementation } from "../../../../infrastructure/adapters/db/implementation/course/course.implementation";
import { CourseUseCaseService } from "@application-use-cases/course/course/course-use-case.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { CourseEntity } from "@domain-entities/course/course.entity";
import { createAddNameMiddleware } from "../../../../core/middlewares/name-module.middleware";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";
import { BcryptService } from "@core-services/bcrypt/bcryp.service";

@Module({
  imports: [
    MikroOrmModule.forFeature([CourseEntity])
  ],
  controllers: [
    CourseController
  ],
  providers: [
    MikroQueryService,
    BcryptService,
    CourseImplementation,
    CourseUseCaseService,
  ]
})
export class CourseModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createAddNameMiddleware("COURSE"))
      .forRoutes(CourseController);
  }
}
