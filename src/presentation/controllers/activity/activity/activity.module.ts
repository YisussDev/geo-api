import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ActivityController } from "./activity.controller";
import { ActivityImplementation } from "../../../../infrastructure/adapters/db/implementation/activity/activity.implementation";
import { ActivityUseCaseService } from "@application-use-cases/activity/activity/activity-use-case.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ActivityEntity } from "@domain-entities/activity/activity.entity";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";
import { createAddNameMiddleware } from "../../../../core/middlewares/name-module.middleware";

@Module({
  imports: [
    MikroOrmModule.forFeature([ActivityEntity])
  ],
  controllers: [
    ActivityController
  ],
  providers: [
    ActivityImplementation,
    ActivityUseCaseService,
    MikroQueryService
  ]
})
export class ActivityModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createAddNameMiddleware("ACTIVITY"))
      .forRoutes(ActivityController);
  }
}
