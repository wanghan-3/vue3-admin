import { reqLogin, reqLogout, reqUserInfo } from "@/api/user";
import { createPinia, defineStore } from "pinia";
import { LoginData } from "@/api/user/type.ts";
import { constRoutes, asyncRouter, anyRouter } from "@/router/routes";
import router from "@/router";
import { StoreState } from "./types";
import type { RouteRecordRaw } from "vue-router";
import { deepClone } from "@/utils/index.ts";
const store = createPinia();

function filterRoutesByUser(routes: RouteRecordRaw[], userRoute: any) {
  const routesNew = deepClone(routes);
  return routesNew.filter((item: RouteRecordRaw) => {
    if (userRoute.includes(item.name)) {
      if (item.children) {
        const children = filterRoutesByUser(item.children, userRoute);
        item.children = children;
      }
      return true;
    }
  });
}

export const useStore = defineStore("store", {
  state: (): StoreState => ({
    currentLocale: "zhCn", // 当前语言
    TOKEN: "", // 用户token
    menuFlex: false, // 菜单是否展开
    menuRouteList: constRoutes, // 菜单路由数据
    refresh: false, // 刷新操作
    userInfo: {
      avatar: "",
      buttons: [],
      name: "",
      roles: [],
      routes: [],
    },
    imgUploadUrl:
      import.meta.env.VITE_APP_BASE_API + "/admin/product/fileUpload", //图片上传地址
    isDark: false, // 是否为暗色模式
    themeColor: "#409eff", // 主题颜色
    filterRouter: [],
  }),
  actions: {
    // 登录
    async userLoginAction(data: LoginData) {
      const res: any = await reqLogin(data);
      this.TOKEN = res.data;
      await this.userInfoAction();
      return res;
    },
    // 登出
    async userLogoutAction() {
      const res: any = await reqLogout();
      this.removeRoute();
      this.TOKEN = "";
      return res;
    },
    async userInfoAction() {
      const res: any = await reqUserInfo();
      this.userInfo = res.data;
      this.filterRoute();
      return res;
    },
    init() {
      // this.filterRoute();
      document.documentElement.className = this.isDark ? "dark" : "";
      this.themeColor &&
        document.documentElement.style.setProperty(
          "--el-color-primary",
          this.themeColor,
        );
    },
    filterRoute() {
      const routes = this.userInfo.routes;
      return new Promise((resolve) => {
        // 过滤菜单显示
        this.filterRouter = filterRoutesByUser(asyncRouter, routes);
        this.menuRouteList = [
          ...constRoutes,
          ...this.filterRouter,
          ...anyRouter,
        ];
        [...this.filterRouter, ...anyRouter].forEach((route) => {
          router.addRoute(route);
        });
        resolve(0);
      });
    },
    removeRoute() {
      [...this.filterRouter, ...anyRouter].forEach((route) => {
        router.removeRoute(route.name as string);
      });
    },
  },
  getters: {},
  persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: "adminStore",
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    paths: ["TOKEN", "currentLocale", "userInfo", "isDark", "themeColor"],
  },
});
export default store;
