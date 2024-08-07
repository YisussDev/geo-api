import { Entity, Enum, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { StudentEntity } from "@domain-entities/student/student.entity";
import { IsString } from "class-validator";
import { Exclude, Expose, Type } from "class-transformer";

@Entity({ tableName: "Account" })
export class AccountEntity {

  @PrimaryKey()
  id: number;

  @Enum(() => DocumentType)
  document_type: number;

  @Property({ unique: true, type: "bigint" })
  document_number: number;

  @Property()
  first_name: string;

  @Property({ nullable: true })
  last_name: string;

  @Property()
  first_surname: string;

  @Property({ nullable: true })
  last_surname: string;

  @Property({ unique: true })
  email: string;

  @Property()
  birthdate: string;

  @Property()
  password: string;

  @Property({ nullable: true })
  verify_token: string;

  @Enum(() => AccountRole)
  rol: string;

  @OneToOne(() => StudentEntity, { nullable: true, unique: true })
  student: StudentEntity;

  @Property({ onCreate: () => new Date() })
  created_at!: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updated_at!: Date;

  @Property({ type: "json", nullable: true })
  img_64: Record<string, any>;

  @Enum(() => AccountStatus)
  status: "ACTIVE" | "INACTIVE";

  @Property({ type: "tinyint" })
  validated: 0 | 1;

  @Property({ nullable: true })
  deletedAt?: Date;

}

export class AccountCreateDto {

  document_number: number;

  first_name: string;

  last_name: string;

  first_surname: string;

  last_surname: string;

  email: string;

  birthdate: string;

  password: string;

  rol: string;

  student: any;

  img_64: any;

  status: any;

  validated: any;

}

export class AccountLoginDto {

  @IsString()
  email: string;

  @IsString()
  password: string;

}

export enum AccountRole {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
}

export enum AccountStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum DocumentType {
  CC = "CC",
  NIT = "NIT",
}

export class AccountResponseDto {

  @Expose()
  id: number;

  @Expose()
  document_type: number;

  @Expose()
  document_number: number;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  first_surname: string;

  @Expose()
  last_surname: string;

  @Expose()
  email: string;

  @Expose()
  birthdate: string;

  @Exclude()
  password: string;

  @Expose()
  rol: string;

  @Expose()
  student: StudentEntity;

  @Expose()
  created_at!: Date;

  @Expose()
  updated_at!: Date;

  @Exclude()
  img_64: Record<string, any>;

  @Expose()
  status: "ACTIVE" | "INACTIVE";

  @Expose()
  validated: 0 | 1;

}

export class AccountPaginateResponseDto {
  @Expose()
  @Type(() => AccountResponseDto)
  data: AccountResponseDto[];

  @Expose()
  links: any;

  @Expose()
  meta: any;

}