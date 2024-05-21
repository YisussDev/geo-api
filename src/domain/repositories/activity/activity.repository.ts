import {ActivityEntity, ActivityCreateDto} from "../../entities/activity/activity.entity";
import { BaseHttpModel } from "@core-interfaces/http/base-response.interface";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface } from "@core-interfaces/http/http-response.interface";

export abstract class ActivityRepository implements BaseHttpModel<ActivityEntity> {

  abstract getAll?(filter: FilterInterface, page?: number): Promise<HttpResponseInterface<ActivityEntity>>;

  abstract getOne?(filter: FilterInterface): Promise<HttpResponseInterface<ActivityEntity>>;

  abstract create?(data: ActivityCreateDto): Promise<{ data : ActivityEntity}>;

  abstract updateOne?(id: string, data: ActivityEntity): Promise<{ data : ActivityEntity}>;

  abstract deleteOne?(id: string): Promise<{ data : ActivityEntity}>;

}
