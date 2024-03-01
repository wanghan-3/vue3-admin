import { reqLogin, reqLogout, reqUserInfo } from "@/api/user";
import { createPinia, defineStore } from "pinia";
import { LoginData } from "@/api/user/type.ts";
import { routes } from "@/router/routes";
import { StoreState } from "./types";
const store = createPinia();
export const useStore = defineStore("store", {
  state: (): StoreState => ({
    currentLocale: "zhCn", // 当前语言
    TOKEN: "", // 用户token
    menuFlex: false, // 菜单是否展开
    menuRouteList: routes, // 菜单路由数据
    refresh: false, // 刷新操作
    userInfo: {},
  }),
  actions: {
    // 登录
    async userLoginAction(data: LoginData) {
      const res: any = await reqLogin(data);
      this.TOKEN = res.data;
      this.userInfoAction();
      return res;
    },
    // 登出
    async userLogoutAction() {
      const res: any = await reqLogout();
      this.TOKEN = "";
      console.log(this.TOKEN, "this.TOKEN this.TOKEN ");

      return res;
    },
    async userInfoAction() {
      const res: any = await reqUserInfo();
      this.userInfo = res.data;
      return res;
    },
  },
  getters: {},
  persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: "adminStore",
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    paths: ["TOKEN", "currentLocale", "userInfo"],
  },
});
export default store;
