export interface ResponseType<D = null> {
  code: number;
  data: D;
  msg: string;
}
// 列表带分页数据 通用类型
export interface ListRes {
  countId: null;
  current: number;
  hitCount: boolean;
  maxLimit: null;
  optimizeCountSql: boolean;
  orders: any[];
  pages: number;
  searchCount: true;
  size: number;
  total: number;
  // records: any[]
}
