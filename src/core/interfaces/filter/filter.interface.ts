export interface FilterInterface {
  selectColumns?: string[];
  singleQuery?: string[];
  singleQueries?: string[][];
  orSingleQueries?: string[][];
  paginate?: number;
}