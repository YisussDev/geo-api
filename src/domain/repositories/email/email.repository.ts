import {EmailEntity} from "../../entities/email/email.entity";
import { BaseHttpModel } from "@core-interfaces/http/base-response.interface";

export abstract class EmailRepository implements BaseHttpModel<EmailEntity> {


}
