import request from "@/utils/request";
import { ResponseType } from "../../type";
import { PermissionInfo } from "../type";
import { replacePathParams } from "@/utils";

enum API {
  PERMISSION_LIST_URL = "admin/acl/permission",
  SAVE_PERMISSION_URL = "admin/acl/permission/save",
  UPDATE_PERMISSION_URL = "admin/acl/permission/update",
  DELETE_PREMISSION_URL = "admin/acl/permission/remove/{id}",
}
// 获取权限列表
export const reqPermissionList = (): Promise<ResponseType<PermissionInfo[]>> =>
  request.get(API.PERMISSION_LIST_URL);
export const reqSavePremission = (data: any) =>
  request.post(API.SAVE_PERMISSION_URL, data);
export const reqUpdatePrmission = (data: any) =>
  request.put(API.UPDATE_PERMISSION_URL, data);
export const reqSaveOrUpdatePremission = (data: any) =>
  data.id ? reqUpdatePrmission(data) : reqSavePremission(data);
export const reqDeletePremission = (id: number) =>
  request.delete(replacePathParams(API.DELETE_PREMISSION_URL, { id }));
