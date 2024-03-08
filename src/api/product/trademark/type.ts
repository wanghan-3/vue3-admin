import { ListRes } from "../../type";

export interface TrademarkListReq {
  page: number;
  limit: number;
}
export interface TrademarkItem {
  createTime: string;
  id: number;
  logoUrl: string;
  tmName: string;
  updateTime: string;
}
// 响应的品牌data数据类型
export interface TrademarkListRes extends ListRes {
  records: TrademarkItem[];
}
// 单项品牌数据类型
export interface TrademarkItemSave {
  id?: number;
  logoUrl: string;
  tmName: string;
}
