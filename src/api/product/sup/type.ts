import { ListRes } from "@/api/type";
export interface SupItem {
  category3Id: number;
  createTime?: string;
  description: string;
  id?: number;
  spuImageList: null;
  spuName: string;
  spuPosterList: null;
  spuSaleAttrList: null;
  tmId: number;
  updateTime?: string;
}
export interface SupLstRes extends ListRes {
  records: SupItem[];
}
