export abstract class BaseMapperModel<EntityLocal, EntityAPI> {
  abstract mapFrom(entityApi: EntityAPI): EntityLocal;

  abstract mapTo(entityLocal: EntityLocal): EntityAPI;
}
