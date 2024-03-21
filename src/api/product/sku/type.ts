import { ListRes } from "@/api/type";

export interface Product {
  category3Id: number;
  createTime: string;
  id: number;
  isSale: number;
  price: number;
  skuAttrValueList: null | any[];
  skuDefaultImg: string;
  skuDesc: string;
  skuImageList: null | any[];
  skuName: string;
  skuSaleAttrValueList: null | any[];
  spuId: number;
  tmId: number;
  updateTime: string;
  weight: string;
}
export interface ProductListRes extends ListRes {
  records: Product[];
}
