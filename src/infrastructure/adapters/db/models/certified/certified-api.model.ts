import { EnrollmentEntity } from "@domain-entities/enrollment/enrollment.entity";

export interface CertifiedApiEntity {
  id: number;
  enrollment: EnrollmentEntity;
  status: "VALID" | "INVALID";
  path: string;
  token: string;
}