import request from "@/utils/request";
import { ResponseType } from "../../type";
import { buildUrl, replacePathParams } from "@/utils";
import { UserList } from "../type";
enum API {
  USER_LIST_URL = "/admin/acl/user/{page}/{limit}",
}
// 获取用户列表
export const reqUserList = (
  data: { page: number; limit: number },
  params: { username: string; name?: string },
) =>
  request.get<any, ResponseType<UserList>>(
    buildUrl(replacePathParams(API.USER_LIST_URL, data), params),
  );
