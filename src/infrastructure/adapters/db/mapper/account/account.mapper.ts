import { BaseMapperModel } from "@core-models/mapper/mapper.model";
import { AccountEntity } from "@domain-entities/account/account.entity";
import { AccountApiEntity } from "../../models/account/account-api.model";

export class AccountMapper extends BaseMapperModel<AccountEntity, AccountApiEntity> {

  public mapFrom(entityApi: AccountApiEntity): AccountEntity {
    return entityApi;
  }

  public mapTo(entityLocal: AccountEntity): AccountApiEntity {
    return entityLocal;
  }

}
