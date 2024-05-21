import { AccountEntity } from "@domain-entities/account/account.entity";

export interface StudentApiEntity {
  id: number;
  courses: any;
  grades: any;
  activities: any;
  account: AccountEntity;
}