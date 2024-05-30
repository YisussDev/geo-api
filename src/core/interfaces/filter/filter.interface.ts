export interface FilterInterface {
  selectColumns?: string[];
  singleQuery?: string[];
  singleQueries?: string[][];
  orSingleQueries?: string[][];
  relations?: string[];
  fields?: string[];
  paginate?: number;
}