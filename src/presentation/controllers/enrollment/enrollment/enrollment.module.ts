import { MiddlewareConsumer, Module } from "@nestjs/common";
import { EnrollmentController } from "./enrollment.controller";
import { EnrollmentImplementation } from "../../../../infrastructure/adapters/db/implementation/enrollment/enrollment.implementation";
import { EnrollmentUseCaseService } from "@application-use-cases/enrollment/enrollment/enrollment-use-case.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { EnrollmentEntity } from "@domain-entities/enrollment/enrollment.entity";
import { BcryptService } from "@core-services/bcrypt/bcryp.service";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";
import { createAddNameMiddleware } from "../../../../core/middlewares/name-module.middleware";


@Module({
  imports: [
   MikroOrmModule.forFeature([EnrollmentEntity])
  ],
  controllers: [
   EnrollmentController
  ],
  providers: [
   BcryptService,
   EnrollmentImplementation,
   EnrollmentUseCaseService,
   MikroQueryService
  ]
})
export class EnrollmentModule {
configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createAddNameMiddleware(""))
      .forRoutes(EnrollmentController);
  }
}
