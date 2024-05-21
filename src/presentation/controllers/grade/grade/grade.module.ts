import { Module } from "@nestjs/common";
import { GradeController } from "./grade.controller";
import { GradeImplementation } from "../../../../infrastructure/adapters/db/implementation/grade/grade.implementation";
import { GradeUseCaseService } from "@application-use-cases/grade/grade/grade-use-case.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { GradeEntity } from "@domain-entities/grade/grade.entity";

@Module({
  imports: [
    MikroOrmModule.forFeature([GradeEntity])
  ],
  controllers: [
    GradeController
  ],
  providers: [
    GradeImplementation,
    GradeUseCaseService,
  ]
})
export class GradeModule {
}
