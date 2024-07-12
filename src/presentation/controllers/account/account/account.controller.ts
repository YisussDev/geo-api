import {
  Headers,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  BadRequestException,
  Patch,
  UseGuards
} from "@nestjs/common";
import { AccountUseCaseService } from "@application-use-cases/account/account/account-use-case.service";
import {
  AccountCreateDto,
  AccountEntity,
  AccountLoginDto, AccountPaginateResponseDto,
  AccountResponseDto
} from "@domain-entities/account/account.entity";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { AuthGuard } from "../../../../core/guards/auth/auth.guard";
import { ModuleGuard } from "../../../../core/guards/module/module.guard";
import { ActionName } from "../../../../core/decorators/name-action.decorator";
import { ValidationGuard } from "../../../../core/guards/validation/validation.guard";
import { Serialize } from "../../../../core/decorators/serialize.decorator";

@Controller("account")
export class AccountController {

  constructor(
    private useCases: AccountUseCaseService
  ) {
  }

  @Post("login")
  public async login(
    @Req() request: any,
    @Body() data: AccountLoginDto
  ): Promise<{ token: string, rol: AccountEntity["rol"] }> {
    return this.useCases.login(data["email"], data["password"]);
  }

  @UseGuards(AuthGuard, ValidationGuard)
  @Get("validate-token")
  public async validateToken(
    @Headers("Authorization") headerToken: string
  ): Promise<{ token: string, data: AccountEntity }> {
    if (!headerToken) throw new BadRequestException(`Not token provide.`);
    const token = headerToken.split(" ")[1];
    if (!token) throw new BadRequestException(`Not token provide.`);
    return this.useCases.validateToken(token);
  }

  @ActionName("LIST_ALL")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Serialize(AccountPaginateResponseDto)
  @Get("")
  public getAll(
    @Req() request: any,
    @Headers() headers: any
  ): Promise<HttpResponseInterface<AccountEntity>> {
    let filterJson: string | undefined = headers["x-filter-model"];
    let filter: FilterInterface = filterJson && JSON.parse(filterJson);
    return this.useCases.getAll(filter, request.query.page);
  }

  @Get("search")
  public getOne(
    @Req() request: any,
    @Headers() headers: any,
    @Param("id") id: string
  ): Promise<{ data: AccountEntity }> {
    let filterJson: string | undefined = headers["x-filter-model"];
    let filter: FilterInterface = filterJson && JSON.parse(filterJson);
    return this.useCases.getOne(filter);
  }

  @Post("")
  public async create(
    @Req() request: any,
    @Body() data: AccountCreateDto
  ): Promise<{ data: AccountEntity }> {
    return this.useCases.create(data);
  }

  @Post("student")
  public async createAccountStudent(
    @Req() request: any,
    @Body() data: AccountCreateDto
  ): Promise<{ data: AccountEntity }> {
    return this.useCases.createAccountStudent(data);
  }

  @ActionName("CREATE_ADMIN")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Post("admin")
  public async createAccountAdmin(
    @Req() request: any,
    @Body() data: AccountCreateDto
  ): Promise<{ data: AccountEntity }> {
    return this.useCases.createAccountAdmin(data);
  }

  @ActionName("DELETE")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Delete(":id")
  public async delete(
    @Req() request: any,
    @Param("id") id: string
  ): Promise<{ data: AccountEntity }> {
    return this.useCases.deleteOne(id);
  }

  @ActionName("UPDATE_ACCOUNT")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Patch(":id")
  public async update(
    @Req() request: any,
    @Param("id") id: string,
    @Body() data: AccountEntity
  ): Promise<{ data: AccountEntity }> {
    return this.useCases.updateOne(id, data);
  }

  @ActionName("VALIDATE_REGISTER")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Get("validate-register/:id")
  public async validateAccountRegister(
    @Param("id") id: string
  ): Promise<{ data: AccountEntity }> {
    return this.useCases.validateAccountRegister(id);
  }

  @Get("validate-account-token/:token")
  public async validateAccountWithToken(
    @Param("token") token: string
  ): Promise<{ data: AccountEntity }> {
    return this.useCases.validateAccountWithToken(token);
  }

  @ActionName("ACTIVE_OR_INACTIVE")
  @UseGuards(AuthGuard, ModuleGuard, ValidationGuard)
  @Get("act-deact/:id")
  public async activateOrDeactivateAccount(
    @Param("id") id: string
  ): Promise<{ data: AccountEntity }> {
    return this.useCases.activateOrDeactivateAccount(id);
  }


}
