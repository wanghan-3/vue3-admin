// 登录接口类型约束
export interface LoginData {
  username: string;
  password: string;
}
export interface LoginRes {
  TOKEN: string;
}
export interface UserInfo {
  avatar: string;
  buttons: string[];
  name: string;
  roles: string[];
  routes: string[];
}
