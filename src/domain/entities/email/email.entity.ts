import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "Email" })
export class EmailEntity {

  @PrimaryKey({
    autoincrement: true
  })
  id: number;

}

export class EmailCreateDto {}