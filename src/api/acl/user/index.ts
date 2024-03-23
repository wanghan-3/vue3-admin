import request from "@/utils/request";
import { ResponseType } from "../../type";
import { buildUrl, replacePathParams } from "@/utils";
import { UserList } from "../type";
enum API {
  USER_LIST_URL = "/admin/acl/user/{page}/{limit}",
  UPDATE_USER_URL = "admin/acl/user/update",
  ADD_USER_URL = "admin/acl/user/save",
  DELETE_USER_URL = "admin/acl/user/batchRemove",
  ROLE_BY_USER_URL = "admin/acl/user/toAssign/{userId}",
  SAVE_ROLE_TO_USER_URL = "admin/acl/user/doAssignRole",
}
// 获取用户列表
export const reqUserList = (
  data: { page: number; limit: number },
  params: { username: string; name?: string },
) =>
  request.get<any, ResponseType<UserList>>(
    buildUrl(replacePathParams(API.USER_LIST_URL, data), params),
  );
export const reqAddUser = (data: {
  username: string;
  password?: string;
  name: string;
}) => request.post(API.ADD_USER_URL, data);

export const reqUpdateUser = (data: {
  id: number;
  name: string;
  username: string;
}) => {
  return request.put<any, any>(API.UPDATE_USER_URL, data);
};
export const reqAddOrUpdateUser = (data: {
  id?: number;
  username: string;
  name: string;
  password?: string;
}) => {
  if (data?.id) {
    return reqUpdateUser({ ...data, id: data.id });
  } else {
    return reqAddUser(data);
  }
};
export const reqDeleteUser = (data: number[]) =>
  request.delete(API.DELETE_USER_URL, { data });
export const reqGetUserRoleByUserId = (userId: number) =>
  request.get(replacePathParams(API.ROLE_BY_USER_URL, { userId }));
export const reqSaveUserRole = (data: {
  userId: number;
  roleIdList: number[];
}) => request.post(API.SAVE_ROLE_TO_USER_URL, data);
