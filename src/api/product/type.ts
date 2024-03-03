import { List_Res } from "../type";

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
export interface TrademarkListRes extends List_Res {
  records: TrademarkItem[]
}
export interface TrademarkItemSave {
  id?: number;
  logoUrl: string;
  tmName: string;
}
