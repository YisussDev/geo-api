import { Injectable } from "@nestjs/common";
import { FilterInterface } from "@core-interfaces/filter/filter.interface";
import { HttpResponseInterface, Links, Meta } from "@core-interfaces/http/http-response.interface";
import { EntityRepository, FindOptions } from "@mikro-orm/core";

@Injectable()
export class MikroQueryService {

  public constructQueriesOrSingleQueries(queries: string[][]): any {
    const queryBuilt = [];
    for (const query of queries) {
      if (query.length == 3) {
        const objQuery = {};
        if (query[1] == "=") {
          objQuery[query[0]] = query[2];
          queryBuilt.push(objQuery);
        } else if (query[0].includes("id")) {
          if (query[2].replace(/\D/g, "").length > 0) {
            objQuery[query[0]] = query[2].replace(/\D/g, "");
            queryBuilt.push(objQuery);
          }
        } else if (query[1] == "LIKE") {
          objQuery[query[0]] = { $ilike: query[2] };
          queryBuilt.push(objQuery);
        } else if (query[1] == "ILIKE") {
          objQuery[query[0]] = { $ilike: query[2] };
          queryBuilt.push(objQuery);
        }
      }
    }
    return queryBuilt;
  }

  public constructQueriesSingleQueries(queries: string[][]): any {
    const queryBuilt = {};
    for (const query of queries) {
      if (query.length == 3) {
        if (query[1] == "=") {
          queryBuilt[query[0]] = query[2];
        } else if (query[0].includes("id")) {
          queryBuilt[query[0]] = query[2].replace(/\D/g, "");
        } else if (query[1] == "LIKE") {
          queryBuilt[query[0]] = { $ilike: query[2] };
        } else if (query[1] == "ILIKE") {
          queryBuilt[query[0]] = { $ilike: query[2] };
        }
      }
    }
    return queryBuilt;
  }

  public async constructResponseWithFilter<Entity>(
    repository: EntityRepository<any>,
    filter: FilterInterface,
    page: number = 1
  ): Promise<HttpResponseInterface<Entity>> {

    let dataToReturn: Entity[];

    let paginate: number = filter["paginate"];

    let totalRegisterFound: number = 0;

    let columnsSelected: string[] = filter["selectColumns"];

    let relations = filter["relations"];

    let fields = filter["fields"];

    let options: any = {};

    if (relations) options["populate"] = relations;

    if (fields) options["fields"] = fields;

    if (paginate && paginate > 0) {
      options["limit"] = paginate;
      options["offset"] = (Math.abs(Number(page) || 1) - 1) * paginate;
    }

    if (filter.orSingleQueries || filter.singleQueries) {
      const queryBuilt = filter.singleQueries ? this.constructQueriesSingleQueries(filter.singleQueries) : {};
      const queryOrBuilt = filter.orSingleQueries ? this.constructQueriesOrSingleQueries(filter.orSingleQueries) : [];
      dataToReturn = await repository.find({ ...queryBuilt, $or: queryOrBuilt }, options);
      totalRegisterFound = await repository.find({ ...queryBuilt, $or: queryOrBuilt }).then(res => res.length);
    } else {
      dataToReturn = await repository.find({}, options);
      totalRegisterFound = await repository.find({}).then(res => res.length);
    }

    const response: HttpResponseInterface<Entity> = {
      data: dataToReturn
    };

    if (paginate && paginate > 0) {
      response["links"] = this.constructLinks(Number(totalRegisterFound), Number(paginate), Number(page));
      response["meta"] = this.constructMeta(Number(totalRegisterFound), Number(paginate), Number(page));
    }

    return response;

  }

  public constructLinks(
    totalFounded: number,
    perPage: number,
    actualPage: number): Links {

    let links: Links = {
      last: "1",
      first: "1",
      next: "1",
      prev: null,
      self: undefined
    };

    if (totalFounded > 0) {
      if (actualPage > 1) {
        links["prev"] = `https://www.url.com?page=${actualPage - 1}`;
      }
      if ((totalFounded > (actualPage * perPage))) {
        links["next"] = `https://www.url.com?page=${actualPage + 1}`;
      } else {
        links["next"] = null;
      }
      if (totalFounded > perPage) {
        let res = totalFounded % perPage;
        links["last"] = `https://www.url.com?page=${res == 0 ? Math.trunc(totalFounded / perPage) : (Math.trunc(totalFounded / perPage) + 1)}`;
      }
    }

    return links;
  }

  public constructMeta(
    totalFounded: number,
    perPage: number,
    actualPage: number): Meta {

    let meta: Meta = {
      current_page: actualPage,
      from: 1,
      to: 1,
      links: [],
      path: "",
      last_page: 1,
      per_page: perPage,
      total: totalFounded
    };

    if (totalFounded > 0) {
      meta["from"] = (perPage * (actualPage - 1)) + 1;
      if (totalFounded > ((actualPage) * perPage)) {
        meta["to"] = actualPage * (perPage);
      } else {
        meta["to"] = totalFounded;
      }
      if (totalFounded > perPage) {
        let res = totalFounded % perPage;
        meta["last_page"] = res == 0 ? Math.trunc(totalFounded / perPage) : (Math.trunc(totalFounded / perPage) + 1);
      }
    }

    if (meta["last_page"] > 0) {
      for (let i = 0; i < meta['last_page']; i++) {
        meta["links"].push({
          active: true,
          label: (i + 1).toString(),
          url: `https://www.url.com?page=${i + 1}`
        });
      }
    }

    return meta;
  }

}