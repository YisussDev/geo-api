import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { EnrollmentEntity } from "@domain-entities/enrollment/enrollment.entity";

@Entity({ tableName: "Certified" })
export class CertifiedEntity {

  @PrimaryKey({ autoincrement: true })
  id: number;

  @OneToOne(() => EnrollmentEntity, { nullable: true, unique: false })
  enrollment: EnrollmentEntity;

  @Property({ default: "INVALID" })
  status: "VALID" | "INVALID";

  @Property({ nullable: true })
  path: string;

  @Property({ nullable: false })
  token: string;

  @Property({ nullable: true })
  deletedAt?: Date;

}

export class CertifiedCreateDto {
}