import { MiddlewareConsumer, Module } from "@nestjs/common";
import { CertifiedController } from "./certified.controller";
import {
  CertifiedImplementation
} from "../../../../infrastructure/adapters/db/implementation/certified/certified.implementation";
import { CertifiedUseCaseService } from "@application-use-cases/certified/certified/certified-use-case.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { CertifiedEntity } from "@domain-entities/certified/certified.entity";
import { BcryptService } from "@core-services/bcrypt/bcryp.service";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";
import { createAddNameMiddleware } from "../../../../core/middlewares/name-module.middleware";


@Module({
  imports: [
    MikroOrmModule.forFeature([CertifiedEntity])
  ],
  controllers: [
    CertifiedController
  ],
  providers: [
    BcryptService,
    CertifiedImplementation,
    CertifiedUseCaseService,
    MikroQueryService
  ]
})
export class CertifiedModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(createAddNameMiddleware("CERTIFIED"))
      .forRoutes(CertifiedController);
  }
}
