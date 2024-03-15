import { ListRes } from "@/api/type";
type stNull = string | null;
// sup单项类型
export interface SpuItem<T extends boolean = true> {
  category3Id: number | null;
  description: string;
  spuImageList: null | SpuImage[];
  spuName: string;
  spuPosterList: null;
  spuSaleAttrList: null | SpuSaleAttr[];
  tmId: number | null;
  id?: number;
  createTime?: T extends true ? stNull : stNull | undefined;
  updateTime?: T extends true ? stNull : stNull | undefined;
}
export interface SpuLstRes extends ListRes {
  records: SpuItem[];
}
export interface Trademark {
  createTime: string;
  id: number;
  logoUrl: string;
  tmName: string;
  updateTime: string;
}
//spu图片
export interface SpuImage {
  id?: number;
  imgName: string;
  imgUrl: string;
  spuId?: number;
  createTime?: string;
  updateTime?: string;
}
// sup销售属性值
export interface SpuSaleAttrValue {
  baseSaleAttrId: number;
  id?: number;
  saleAttrName: string;
  saleAttrValueName: string;
  spuId: number;
  isChecked?: boolean | null;
  createTime?: stNull;
  updateTime?: stNull;
}
// sup销售属性
export interface SpuSaleAttr {
  baseSaleAttrId: number;
  saleAttrName: string;
  id?: number;
  spuId?: number;
  createTime?: stNull;
  updateTime?: stNull;
  spuSaleAttrValueList: SpuSaleAttrValue[];
}
// sup销售属性列表 仅为选项使用
export interface SpuSaleAllItem {
  id: number;
  name: string;
}
export interface SkuItem {
  spuId: number;
  category3Id: number | null;
  tmId: number | null;
  skuName: string;
  price: number;
  weight: number;
  skuDesc: string;
  skuDefaultImg: string;
  skuAttrValueList: SkuAttr[];
  skuSaleAttrValueList: SkuSaleAttr[];
}
// sku属性
export interface SkuAttr {
  attrId: number;
  valueId: number;
}
// sku销售属性
export interface SkuSaleAttr {
  saleAttrId: number;
  saleAttrValueId: number;
}
