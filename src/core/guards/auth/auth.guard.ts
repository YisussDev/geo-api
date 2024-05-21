import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { EntityManager } from "@mikro-orm/core";
import { AccountEntity } from "@domain-entities/account/account.entity";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private em: EntityManager
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    let tokenDecoded!: AccountEntity;
    try {
      tokenDecoded = await this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException("Token corrupt or not valid");
    }
    const account = await this.em.findOne(AccountEntity, { id: tokenDecoded.id });
    if (!account) throw new UnauthorizedException("Cuenta no existe.");
    if (!(account.status == "ACTIVE")) throw new UnauthorizedException("Cuenta inactiva.");
    request["account"] = account;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers["authorization"].split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }

}