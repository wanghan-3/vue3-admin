import request from "@/utils/request";
import { CategoryTypeRes, AttrData, AttrListParams } from "./type";
import { ResponseType } from "../../type";
import { replacePathParams } from "@/utils";
enum API {
  GET_CATEGORY_ONE = "/admin/product/getCategory1", // 获取一级分类
  GET_CATEGORY_TWO = "/admin/product/getCategory2/{id}", // 获取二级分类
  GET_CATEGORY_THREE = "/admin/product/getCategory3/{id}", // 获取三级分类
  GET_ATTR_INFO_LIST = "/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}",
  SAVE_ATTR_INFO = "/admin/product/saveAttrInfo", // 保存属性
  DELETE_ATTR = "/admin/product/deleteAttr/{attrId}", // 删除属性
}

// 获取分类接口
export const reqGetCategory = (_: { id?: number; category?: number }) => {
  let url = "";
  switch (_.category) {
    case 1:
      url = API.GET_CATEGORY_ONE;

      break;
    case 2:
      url = API.GET_CATEGORY_TWO;
      break;
    case 3:
      url = API.GET_CATEGORY_THREE;
      break;
    default:
      break;
  }
  delete _.category;
  return request.get<any, ResponseType<CategoryTypeRes>>(
    replacePathParams(url, _),
  );
};
// 获取属性列表接口
export const reqGetAttrInfoList = (data: AttrListParams) =>
  request.get<any, ResponseType<AttrData[]>>(
    replacePathParams(API.GET_ATTR_INFO_LIST, data),
  );
// 保存属性接口
export const reqSaveAttrInfo = (_: AttrData) =>
  request.post<any, ResponseType>(API.SAVE_ATTR_INFO, _);
// 删除属性接口
export const reqDeleteAttr = (data: { attrId: number }) =>
  request.delete<any, ResponseType>(replacePathParams(API.DELETE_ATTR, data));
