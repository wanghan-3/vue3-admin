import { UserInfo } from "@/api/user/type";
import type { RouteRecordRaw } from "vue-router";

export interface StoreState {
  userInfo: UserInfo;
  currentLocale: string; // 当前语言
  TOKEN: string; // 用户token
  menuFlex: boolean; // 菜单是否展开
  menuRouteList: RouteRecordRaw[]; // 菜单路由数据
  refresh: boolean; // 刷新操作
}
