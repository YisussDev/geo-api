import { CreateEntity } from "./entity/createEntity";
import { CreateRepository } from "./repository/createRepository";
import { CreateImplementation } from "./implementation/createImplementation";
import { CreateMapper } from "./mapper/createMapper";
import { CreateModel } from "./models/createModel";
import { CreateUseCase } from "./use-case/createUseCase";
import { DirectionsModule } from "./directions";
import { CreateController } from "./controller/createController";
import { CreateModule } from "./module/createModule";

function constructorModules() {

  const params: string[] = process.argv;

  const directions: any = DirectionsModule;

  CreateEntity.constructEntity(directions.entity.src, directions.entity.example);
  CreateRepository.constructRepository(directions.repository.src, directions.repository.example);
  CreateModel.constructModel(directions.models.src, directions.models.example);
  CreateMapper.constructMapper(directions.mappers.src, directions.mappers.example);
  CreateImplementation.constructImplementation(directions.implementation.src, directions.implementation.example);
  CreateUseCase.constructUseCase(directions.use_case.src, directions.use_case.example);
  CreateController.constructController(directions.controller.src, directions.controller.example);
  CreateModule.constructModule(directions.module.src, directions.module.example);

}


constructorModules();
