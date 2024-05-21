import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AccountEntity } from "@domain-entities/account/account.entity";

@Injectable()
export class ValidationGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const account: AccountEntity = request["account"];

    if (!(account.validated == 1)) throw new UnauthorizedException("Cuenta no validada.");

    return account.validated == 1;
  }

}