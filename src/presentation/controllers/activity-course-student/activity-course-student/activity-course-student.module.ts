import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ActivityCourseStudentController } from "./activity-course-student.controller";
import {
  ActivityCourseStudentImplementation
} from "../../../../infrastructure/adapters/db/implementation/activity-course-student/activity-course-student.implementation";
import {
  ActivityCourseStudentUseCaseService
} from "@application-use-cases/activity-course-student/activity-course-student/activity-course-student-use-case.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ActivityCourseStudentEntity } from "@domain-entities/activity-course-student/activity-course-student.entity";
import { BcryptService } from "@core-services/bcrypt/bcryp.service";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";
import { createAddNameMiddleware } from "../../../../core/middlewares/name-module.middleware";


@Module({
  imports: [
    MikroOrmModule.forFeature([ActivityCourseStudentEntity])
  ],
  controllers: [
    ActivityCourseStudentController
  ],
  providers: [
    BcryptService,
    ActivityCourseStudentImplementation,
    ActivityCourseStudentUseCaseService,
    MikroQueryService
  ]
})
export class ActivityCourseStudentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createAddNameMiddleware("ACTIVITY_COURSE_STUDENT"))
      .forRoutes(ActivityCourseStudentController);
  }
}
