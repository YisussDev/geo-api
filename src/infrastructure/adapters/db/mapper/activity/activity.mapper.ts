import { BaseMapperModel } from "@core-models/mapper/mapper.model";
import { ActivityEntity } from "@domain-entities/activity/activity.entity";
import { ActivityApiEntity } from "../../models/activity/activity-api.model";

export class ActivityMapper extends BaseMapperModel<ActivityEntity, ActivityApiEntity> {

  public mapFrom(entityApi: ActivityApiEntity): ActivityEntity {
    return entityApi;
  }

  public mapTo(entityLocal: ActivityEntity): ActivityApiEntity {
    return entityLocal;
  }

}
