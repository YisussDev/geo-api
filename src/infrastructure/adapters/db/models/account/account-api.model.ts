import { StudentEntity } from "@domain-entities/student/student.entity";

export interface AccountApiEntity {
  id: number;
  document_type: number;
  document_number: number;
  first_name: string;
  last_name: string;
  first_surname: string;
  last_surname: string;
  email: string;
  birthdate: string;
  password: string;
  rol: string;
  student: StudentEntity;
  created_at: Date;
  updated_at: Date;
  img_64: Record<string, any>;
  status: "ACTIVE" | "INACTIVE";
  validated: 0 | 1;
}