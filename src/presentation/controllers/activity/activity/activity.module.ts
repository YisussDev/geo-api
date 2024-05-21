import { Module } from "@nestjs/common";
import { ActivityController } from "./activity.controller";
import { ActivityImplementation } from "../../../../infrastructure/adapters/db/implementation/activity/activity.implementation";
import { ActivityUseCaseService } from "@application-use-cases/activity/activity/activity-use-case.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ActivityEntity } from "@domain-entities/activity/activity.entity";

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
  ]
})
export class ActivityModule {
}
