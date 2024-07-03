import { Collection, Entity, ManyToMany, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { GradeEntity } from "@domain-entities/grade/grade.entity";
import { ActivityEntity } from "@domain-entities/activity/activity.entity";
import { AccountEntity } from "@domain-entities/account/account.entity";
import { EnrollmentEntity } from "@domain-entities/enrollment/enrollment.entity";

@Entity({ tableName: "Student" })
export class StudentEntity {

  @PrimaryKey()
  id: number;

  @OneToMany(() => GradeEntity, grade => grade.student)
  grades = new Collection<GradeEntity>(this);

  @OneToOne(() => AccountEntity, { nullable: true })
  account: AccountEntity;

  @OneToMany(() => EnrollmentEntity, enrollment => enrollment.student)
  enrollments = new Collection<EnrollmentEntity>(this);

  @Property({ nullable: true })
  deletedAt?: Date;

}

export class StudentCreateDto {
}