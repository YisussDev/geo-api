import { FilterInterface } from "../filter/filter.interface";
import { HttpResponseInterface } from "./http-response.interface";

export abstract class BaseHttpModel<Entity> {

  abstract getAll?(filter: FilterInterface): Promise<HttpResponseInterface<Entity>>;

  abstract getOne?(filter: FilterInterface): Promise<{ data: Entity }>;

  abstract create?(data: Entity): Promise<{ data: Entity }>;

  abstract updateOne?(id: string, data: Entity): Promise<{ data: Entity }>;

  abstract deleteOne?(id: string): Promise<{ data: Entity }>;

}
