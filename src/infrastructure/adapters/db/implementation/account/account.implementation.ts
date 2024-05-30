import { AccountRepository } from "@domain-repositories/account/account.repository";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AccountMapper } from "../../mapper/account/account.mapper";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";
import { AccountCreateDto, AccountEntity } from "@domain-entities/account/account.entity";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { StudentEntity } from "@domain-entities/student/student.entity";
import { BcryptService } from "@core-services/bcrypt/bcryp.service";
import { JwtService } from "@nestjs/jwt";
import { MikroQueryService } from "@core-services/mikro/mikro-queries.service";
import { modulesDictionaries } from "../../../../../core/dictionaries/modules/modules.dictionaries";

@Injectable()
export class AccountImplementation implements AccountRepository {

  private moduleAccountDictionaries = modulesDictionaries["ACCOUNT"];

  private mapper = new AccountMapper();

  constructor(
    @InjectRepository(AccountEntity) private readonly repository: EntityRepository<AccountEntity>,
    private jwtService: JwtService,
    private readonly em: EntityManager,
    private bcryptService: BcryptService,
    private mikroQueryService: MikroQueryService
  ) {
  }

  public async getAll(filter?: FilterInterface, page?: number | null): Promise<HttpResponseInterface<AccountEntity>> {
    if (!filter) {
      return {
        data: await this.repository.find({}, { populate: ["student"] })
      };
    } else {
      return await this.mikroQueryService.constructResponseWithFilter<AccountEntity>(this.repository, filter, page);
    }
  }

  public async getOne(filter: FilterInterface): Promise<{ data: AccountEntity }> {

    if (!filter || !filter["singleQueries"]) throw new BadRequestException(`Bad filter or petition.`);

    let queries: string[][] = filter["singleQueries"];

    let relations = filter["relations"];

    let queriesToFilter = {};

    let options = {};

    for (let query of queries) {
      queriesToFilter[query[0]] = query[2];
    }

    if (relations) options["populate"] = relations;

    const account = await this.em.findOne(AccountEntity, queriesToFilter, options);

    if (!account) throw new BadRequestException(`Account not exist`);

    return {
      data: account
    };

  }

  public async create(data: AccountCreateDto): Promise<{ data: AccountEntity }> {

    const actions = this.moduleAccountDictionaries["ACTIONS"];

    const newObject = this.repository.create(data);
    await this.repository.insert(newObject);

    return {
      data: newObject
    };
  }

  public async createAccountStudent(data: AccountCreateDto): Promise<{ data: AccountEntity }> {
    return this.em.transactional(async (em) => {

      data.password = await this.bcryptService.hashPassword(data.password);
      data.rol = "STUDENT";
      data.status = "ACTIVE";
      data.validated = 0;

      // Crear una nueva cuenta
      const newAccount = em.create(AccountEntity, data);
      await em.persistAndFlush(newAccount);

      // Crear un estudiante asociado con la nueva cuenta
      const newStudent = em.create(StudentEntity, { account: newAccount });
      newAccount.student = newStudent; // Asignar el estudiante a la cuenta

      // Persistir ambos
      await em.persistAndFlush(newStudent);
      await em.persistAndFlush(newAccount);

      return {
        data: newAccount
      };
    });
  }

  public async createAccountAdmin(data: AccountCreateDto): Promise<{ data: AccountEntity }> {
    return this.em.transactional(async (em) => {

      data.password = await this.bcryptService.hashPassword(data.password);
      data.rol = "ADMIN";
      data.status = "ACTIVE";
      data.validated = 1;

      const newAccount = em.create(AccountEntity, data);
      await em.persistAndFlush(newAccount);

      return {
        data: newAccount
      };
    });
  }

  public async updateOne(id: string, data: AccountEntity): Promise<{ data: AccountEntity }> {
    const account = await this.repository.findOne({ id: Number(id) });
    if (!account) {
      throw new Error("User not found");
    } else {
      // @ts-ignore
      this.repository.assign(account, data);
      await this.em.flush();
      return {
        data: account
      };
    }
  }

  public async validateAccountRegister(id: string): Promise<{ data: AccountEntity }> {
    const account = await this.repository.findOne({ id: Number(id) });
    if (!account) {
      throw new Error("Account not found");
    } else {
      // @ts-ignore
      this.repository.assign(account, { validated: 1 });
      await this.em.flush();
      return {
        data: account
      };
    }
  }

  public async deleteOne(id: string): Promise<{ data: AccountEntity }> {

    const object = await this.repository.findOne(Number(id));

    if (!object) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    await this.repository.nativeDelete(object);

    return {
      data: object
    };

  }

  public async login(email: string, password: string): Promise<{ token: string, rol: AccountEntity["rol"] }> {

    const object = await this.repository.findOne({ email: email }, { populate: ["student"] });

    if (!object) {
      throw new BadRequestException(`Account with email ${email} not found`);
    }

    let account = JSON.parse(JSON.stringify(object));

    if (!await this.bcryptService.comparePasswords(password, account.password)) {
      throw new BadRequestException(`Credenciales inválidas.`);
    }

    account.password = "";

    account.img_64 = "";


    return { token: this.jwtService.sign(account), rol: account.rol };
  }

  public async validateToken(token: string): Promise<{ token: string, data: AccountEntity }> {

    const dataToken: AccountEntity = this.jwtService.verify(token);
    const account: AccountEntity = await this.repository.findOne({ id: dataToken.id });
    const copyDataToken: AccountEntity = JSON.parse(JSON.stringify(dataToken));

    delete copyDataToken["img_64"];
    delete copyDataToken["iat"];
    delete copyDataToken["exp"];

    if (!dataToken) throw new BadRequestException(`Expired token or invalid token.`);

    delete dataToken["iat"];
    delete dataToken["exp"];

    return { data: account, token: this.jwtService.sign(copyDataToken) };
  }

  public async validateAccount(data: AccountEntity): Promise<AccountEntity> {

    const user = await this.em.findOne(AccountEntity, { email: data.email });

    if (user && (data.password === user.password)) {
      const { password, ...result } = user;

      user.password = null;

      return user;

    } else {
      throw new BadRequestException(`Account with email ${data.email} not found or credential invalid.`);
    }

  }

  public async activateOrDeactivateAccount(id: string): Promise<{ data: AccountEntity }> {

    const account = await this.repository.findOne({ id: Number(id) }, { populate: ["student"] });
    if (!account) {
      throw new Error("Account not found");
    } else {
      if (account.status == "ACTIVE") {
        this.repository.assign(account, { status: "INACTIVE" });
      } else {
        this.repository.assign(account, { status: "ACTIVE" });
      }
      await this.em.flush();
      return {
        data: account
      };
    }

  }

}
