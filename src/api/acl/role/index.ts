import request from "@/utils/request";
import { ResponseType } from "../../type";
import { buildUrl, replacePathParams } from "@/utils";
import { PermissionInfo, RoleItem, RoleList } from "../type";
import { Optional } from "@/utils/type";

enum API {
  ROLE_LIST_URL = "admin/acl/role/{page}/{limit}",
  UPDATE_USER_URL = "admin/acl/role/update",
  SAVE_ROLE_URL = "admin/acl/role/save",
  DELETE_ROLE_URL = "admin/acl/role/remove/{id}",
  PERMISSION_BY_ROLE_URL = "admin/acl/permission/toAssign/{id}",
  SAVE_PERMISSION_TO_ROLE_URL = "/admin/acl/permission/doAssign",
}
// 获取角色列表
export const reqRoleList = (
  data: { page: number; limit: number },
  params: { roleName: string },
) =>
  request.get<any, ResponseType<RoleList>>(
    buildUrl(replacePathParams(API.ROLE_LIST_URL, data), params),
  );
// 添加角色
export const reqAddRole = (data: { roleName: string }) =>
  request.post(API.SAVE_ROLE_URL, data);

// 更新角色
export const reqUpdateRole = (data: { id: number; roleName: string }) => {
  return request.put<any, any>(API.UPDATE_USER_URL, data);
};
// 添加或更新角色
export const reqAddOrUpdateRole = (
  data: Optional<RoleItem, "id" | "createTime" | "updateTime" | "remark">,
) => {
  if (data?.id) {
    return reqUpdateRole({ ...data, id: data.id });
  } else {
    return reqAddRole(data);
  }
};
// 删除角色
export const reqDeleteRole = (data: { id: number }) =>
  request.delete(replacePathParams(API.DELETE_ROLE_URL, data));
export const reqGetPermissionByRoleId = (id: number) =>
  request.get<any, ResponseType<PermissionInfo[]>>(
    replacePathParams(API.PERMISSION_BY_ROLE_URL, { id }),
  );
// 保存权限到角色
export const reqSavePermissionToRole = (data: {
  roleId: number;
  permissionId: number[];
}) => request.post(buildUrl(API.SAVE_PERMISSION_TO_ROLE_URL, data));
