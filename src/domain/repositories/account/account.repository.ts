import { AccountEntity, AccountCreateDto } from "../../entities/account/account.entity";
import { BaseHttpModel } from "@core-interfaces/http/base-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";

export abstract class AccountRepository implements BaseHttpModel<AccountEntity> {

  abstract getAll?(filter: FilterInterface, page?: number): Promise<HttpResponseInterface<AccountEntity>>;

  abstract getOne?(filter: FilterInterface): Promise<{ data: AccountEntity }>;

  abstract create?(data: AccountCreateDto): Promise<{ data: AccountEntity }>;

  abstract updateOne?(id: string, data: AccountEntity): Promise<{ data: AccountEntity }>;

  abstract deleteOne?(id: string): Promise<{ data: AccountEntity }>;

}
