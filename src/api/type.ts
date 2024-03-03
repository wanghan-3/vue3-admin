export interface ResponseType<D = null> {
  code: number;
  data: D;
  msg: string;
}
export interface List_Res {
  countId: null;
  current: number;
  hitCount: boolean;
  maxLimit: null;
  optimizeCountSql: boolean;
  orders: any[];
  pages: number
  searchCount: true
  size: number
  total: number
  // records: any[]
}