import request from "@/utils/request";
import { LoginData, LoginRes } from "./type";
import { ResponseType } from "../type";
enum API {
  LOGIN = "admin/acl/index/login",
  USER_INFO = "user/userInfo",
  LOGOUT = "admin/acl/index/logout",
}
// 登录
export const reqLogin = (_: LoginData) =>
  request.post<any, ResponseType<LoginRes>>(API.LOGIN, _);
// 登出
export const reqLogout = () => request.post<any, ResponseType>(API.LOGOUT);
// 用户信息
export const reqUserInfo = () => request.get(API.USER_INFO);
