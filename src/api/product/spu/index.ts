import request from "@/utils/request";
import { replacePathParams } from "@/utils";
import { ResponseType } from "../../type";
import {
  SpuLstRes,
  Trademark,
  SpuImage,
  SpuSaleAttr,
  SpuSaleAllItem,
  SpuItem,
  SkuItem,
} from "./type";
enum API {
  GET_SPU_LIST = "/admin/product/{page}/{limit}", // 获取一级分类
  ALL_TARDEMARK = "admin/product/baseTrademark/getTrademarkList", // 获取品牌列表
  IMAGE_BY_SPU_ID = "/admin/product/spuImageList/{spuId}", // 根据spuId获取图片列表
  SPU_SALE_ATTR_LIST = "/admin/product/spuSaleAttrList/{spuId}", // 获取销售属性列表
  SPU_SALE_ATTR_LIST_ALL = "/admin/product/baseSaleAttrList", // 获取销售属性列表
  ADD_SPU = "/admin/product/saveSpuInfo", // 新增spu
  UPDATE_SPU = "/admin/product/updateSpuInfo", // 更新spu
  DELETE_SPI = "/admin/product/deleteSpu/{spuId}", // 删除spu
  SAVE_SKU_INFO = "/admin/product/saveSkuInfo", // 保存sku信息
  FIND_SKU_BY_SPUID = "/admin/product/findBySpuId/{spuId}", // 保存sku信息
}
// 获取三级分类下 的 spu数据
export const reqGetSpuList = (data: any) =>
  request.get<any, ResponseType<SpuLstRes>>(
    replacePathParams(API.GET_SPU_LIST, data) +
      `?category3Id=${data.category3Id}`,
  );
// 获取品牌列表
export const reqGetAllTrademark = () =>
  request.get<any, ResponseType<Trademark[]>>(API.ALL_TARDEMARK);
// 根据spuId获取图片列表
export const reqGetImageBySpuId = (data: { spuId: number }) =>
  request.get<any, ResponseType<SpuImage[]>>(
    replacePathParams(API.IMAGE_BY_SPU_ID, data),
  );
// 获取已有销售属性列表
export const reqGetSaleAttrList = (data: { spuId: number }) =>
  request.get<any, ResponseType<SpuSaleAttr[]>>(
    replacePathParams(API.SPU_SALE_ATTR_LIST, data),
  );
// 获取所有销售属性列表
export const reqAllSaleAttr = () =>
  request.get<any, ResponseType<SpuSaleAllItem[]>>(API.SPU_SALE_ATTR_LIST_ALL);
// 新增spu
export const reqAddSpu = (
  data: SpuItem, // 可选的
) => request.post<any, ResponseType>(API.ADD_SPU, data);
// 更新spu
export const reqUpdateSpu = (data: SpuItem) =>
  request.post<any, ResponseType>(API.UPDATE_SPU, data);

export const reqSaveSpu = (data: SpuItem) =>
  data.id ? reqUpdateSpu(data) : reqAddSpu(data);
export const reqDeleteSpu = (data: { spuId: number }) =>
  request.delete<any, ResponseType>(replacePathParams(API.DELETE_SPI, data));
// 保存sku信息接口
export const reqSaveSkuInfo = (data: SkuItem) =>
  request.post<any, ResponseType>(API.SAVE_SKU_INFO, data);
//  根据spuId获取sku列表
export const reqSkuListBuSpuId = (data: { spuId: number }) =>
  request.get(replacePathParams(API.FIND_SKU_BY_SPUID, data));
