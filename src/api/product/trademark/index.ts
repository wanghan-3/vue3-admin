import { TrademarkItemSave, TrademarkListReq, TrademarkListRes } from "./type";
import { ResponseType } from "../../type";
import { replacePathParams } from "@/utils";
import request from "@/utils/request";
enum API {
  BASE_TRADEMARK_LIST = "admin/product/baseTrademark/{page}/{limit}",
  BASE_TRADEMARK_DELETE = "/admin/product/baseTrademark/remove/{id}",
  BASE_TRADEMARK_SAVE = "/admin/product/baseTrademark/save",
  BASE_TRADEMARK_UPDATE = "/admin/product/baseTrademark/update", // 跟新
}
// 品牌列表
export const reqTrademarkList = (data: TrademarkListReq) =>
  request.get<any, ResponseType<any>>(
    replacePathParams(API.BASE_TRADEMARK_LIST, data),
  );
// 品牌删除
export const reqTrademarkDelete = (data: { id: string }) =>
  request.delete<any, ResponseType<TrademarkListRes>>(
    replacePathParams(API.BASE_TRADEMARK_DELETE, data),
  );
// 品牌增改
export const reqTrademarkSave = (_: TrademarkItemSave) =>
  _.id
    ? request.put<any, ResponseType>(API.BASE_TRADEMARK_UPDATE, _)
    : request.post<any, ResponseType>(API.BASE_TRADEMARK_SAVE, _);
