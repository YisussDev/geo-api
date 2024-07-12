import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import {
  AccountImplementation
} from "../../../../infrastructure/adapters/db/implementation/account/account.implementation";
import { AccountUseCaseService } from "@application-use-cases/account/account/account-use-case.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { AccountEntity } from "@domain-entities/account/account.entity";
import { BcryptService } from "@core-services/bcrypt/bcryp.service";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";
import { createAddNameMiddleware } from "../../../../core/middlewares/name-module.middleware";
import { EmailUseCaseService } from "@application-use-cases/email/email/email-use-case.service";

@Module({
  imports: [
    MikroOrmModule.forFeature([AccountEntity])
  ],
  controllers: [
    AccountController
  ],
  providers: [
    BcryptService,
    AccountImplementation,
    AccountUseCaseService,
    MikroQueryService,
    EmailUseCaseService
  ]
})
export class AccountModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createAddNameMiddleware("ACCOUNT"))
      .forRoutes(AccountController);
  }
}
