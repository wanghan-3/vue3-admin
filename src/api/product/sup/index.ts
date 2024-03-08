import request from "@/utils/request";
import { replacePathParams } from "@/utils";
import { ResponseType } from "../../type";
import { SupLstRes } from "./type";
enum API {
  GET_SPU_LIST = "/admin/product/{page}/{limit}", // 获取一级分类
}
// 获取三级分类下 的 spu数据
export const reqGetSupList = (data: any) =>
  request.get<any, ResponseType<SupLstRes>>(
    replacePathParams(API.GET_SPU_LIST, data) +
      `?category3Id=${data.category3Id}`,
  );
