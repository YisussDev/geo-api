import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { modulesDictionaries } from "../../dictionaries/modules/modules.dictionaries";
import { Reflector } from "@nestjs/core";
import { AccountEntity } from "@domain-entities/account/account.entity";

@Injectable()
export class ModuleGuard implements CanActivate {

  private moduleAccountDictionaries = modulesDictionaries;

  constructor(
    private reflector: Reflector,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const actionName = this.reflector.get<string>("actionName", context.getHandler());
    const request = context.switchToHttp().getRequest();
    request.actionName = actionName;
    const account: AccountEntity = request["account"];
    const nameModule: string = request["nameModule"];
    const nameAction: string = request["actionName"];

    if(!this.validateActionModuleAccount(account, nameModule, nameAction)) throw new UnauthorizedException("Acción no autorizada para esta cuenta");

    return this.validateActionModuleAccount(account, nameModule, nameAction);
  }

  private validateActionModuleAccount(account: AccountEntity, nameModule: string, nameAction: string): boolean {

    let isValid: boolean = false;

    const rolAccount: AccountEntity["rol"] = account.rol;

    if (modulesDictionaries[nameModule] && modulesDictionaries[nameModule][nameAction]) {
      for (const rolAllowed of modulesDictionaries[nameModule][nameAction]["rolAllowed"]) {
        if (rolAccount == rolAllowed) isValid = true;
      }
    }

    return isValid;
  }

}