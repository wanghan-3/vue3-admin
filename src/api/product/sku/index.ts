import request from "@/utils/request";
import { ResponseType } from "../../type";
import { replacePathParams } from "@/utils";
import { Product, ProductListRes } from "./type";
enum API {
  PRODUCT_LIST = "/admin/product/list/{page}/{limit}", // 获取一级分类
  PRODUCT_ON_SALE = "/admin/product/onSale/{skuId}",
  PRODUCT_CANCEL_SALE = "/admin/product/cancelSale/{skuId}",
  SKU_INFO = "admin/product/getSkuInfo/{skuId}",
  DELETE_SKU = "admin/product/deleteSku/{skuId}",
}
export const reqProductList = (data: { page: number; limit: number }) =>
  request.get<any, ResponseType<ProductListRes>>(
    replacePathParams(API.PRODUCT_LIST, data),
  );
// 商品上架或者下架
export const reqProductOnSaleOrCancelSaleSale = (data: {
  skuId: number;
  isSale: boolean;
}) =>
  request.get(
    replacePathParams(
      data.isSale ? API.PRODUCT_CANCEL_SALE : API.PRODUCT_ON_SALE,
      data,
    ),
  );
// 获取sku详情
export const reqGetSkuInfo = (data: { skuId: number }) =>
  request.get<any, ResponseType<Product>>(
    replacePathParams(API.SKU_INFO, data),
  );
// 删除sku
export const reqDeleteSku = (data: { skuId: number }) =>
  request.delete(replacePathParams(API.DELETE_SKU, data));
