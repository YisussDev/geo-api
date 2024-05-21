export const DirectionsModule: any = {
  entity: {
    src: "src/domain/entities",
    example: "src/scripts/entity/example_entity/entity.txt"
  },
  repository: {
    src: 'src/domain/repositories',
    example: 'src/scripts/repository/example_repository/repository.txt',
  },
  implementation: {
    src: 'src/infrastructure/adapters/db/implementation',
    example: 'src/scripts/implementation/example_implementation/implementation.txt',
  },
  mappers: {
    src: 'src/infrastructure/adapters/db/mapper',
    example: 'src/scripts/mapper/example_mapper/mapper.txt',
  },
  models: {
    src: 'src/infrastructure/adapters/db/models',
    example: 'src/scripts/models/example_model/model.txt',
  },
  use_case: {
    src: 'src/application/use-cases',
    example: 'src/scripts/use-case/example_use_case/use_case.txt',
  },
  module: {
    src: 'src/presentation/controllers',
    example: 'src/scripts/module/example_module/module.txt',
  },
  controller: {
    src: 'src/presentation/controllers',
    example: 'src/scripts/controller/example_controller/controller.txt',
  },
}
