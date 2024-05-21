import { Injectable } from "@nestjs/common";
import { AccountRepository } from "@domain-repositories/account/account.repository";
import {
  AccountImplementation
} from "../../../../infrastructure/adapters/db/implementation/account/account.implementation";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { AccountCreateDto, AccountEntity } from "@domain-entities/account/account.entity";

@Injectable()
export class AccountUseCaseService implements AccountRepository {


  constructor(
    private implementation: AccountImplementation
  ) {
  }

  public getAll(filter?: FilterInterface, page?: number | null): Promise<HttpResponseInterface<AccountEntity>> {
    return this.implementation.getAll(filter, page);
  }

  public create(data: AccountCreateDto): Promise<{ data: AccountEntity }> {
    return this.implementation.create(data);
  }

  public createAccountStudent(data: AccountCreateDto): Promise<{ data: AccountEntity }> {
    return this.implementation.createAccountStudent(data);
  }

  public createAccountAdmin(data: AccountCreateDto): Promise<{ data: AccountEntity }> {
    return this.implementation.createAccountAdmin(data);
  }

  public updateOne(id: string, data: AccountEntity): Promise<{ data: AccountEntity }> {
    return this.implementation.updateOne(id, data);
  }

  public deleteOne(id: string): Promise<{ data: AccountEntity }> {
    return this.implementation.deleteOne(id);
  }

  public login(email: string, password: string): Promise<{ token: string, rol: AccountEntity["rol"] }> {
    return this.implementation.login(email, password);
  }

  public validateToken(token: string): Promise<{ token: string, data: AccountEntity }> {
    return this.implementation.validateToken(token);
  }

  public validateAccount(data: AccountEntity): Promise<AccountEntity> {
    return this.implementation.validateAccount(data);
  }

}