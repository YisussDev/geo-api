import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ActivityCourseController } from "./activity-course.controller";
import {
  ActivityCourseImplementation
} from "../../../../infrastructure/adapters/db/implementation/activity-course/activity-course.implementation";
import {
  ActivityCourseUseCaseService
} from "@application-use-cases/activity-course/activity-course/activity-course-use-case.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ActivityCourseEntity } from "@domain-entities/activity-course/activity-course.entity";
import { BcryptService } from "@core-services/bcrypt/bcryp.service";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";
import { createAddNameMiddleware } from "../../../../core/middlewares/name-module.middleware";


@Module({
  imports: [
    MikroOrmModule.forFeature([ActivityCourseEntity])
  ],
  controllers: [
    ActivityCourseController
  ],
  providers: [
    BcryptService,
    ActivityCourseImplementation,
    ActivityCourseUseCaseService,
    MikroQueryService
  ]
})
export class ActivityCourseModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createAddNameMiddleware("ActivityCourse"))
      .forRoutes(ActivityCourseController);
  }
}
