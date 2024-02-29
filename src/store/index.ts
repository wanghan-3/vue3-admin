import { reqLogin, reqLogout } from "@/api/user";
import { createPinia, defineStore } from "pinia";
import { LoginData } from "@/api/user/type.ts";
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
const store = createPinia();
export const useStore = defineStore("store", {
  state: () => ({
    currentLocale: "zhCn", // 当前语言
    TOKEN: "", // 用户token
    menuFlex: false, // 菜单是否展开
    menuRouteList: routes, // 菜单路由数据
    refresh: false, // 刷新操作
  }),
  actions: {
    // 登录
    async userLoginAction(data: LoginData) {
      const res: any = await reqLogin(data);
      this.TOKEN = res.data;
      return res;
    },
    // 登出
    async userLogoutAction() {
      const res: any = await reqLogout();
      this.TOKEN = "";
      const router = useRouter();

      console.log(router, "router");

      router.push("/login");
      return res;
    },
  },
  getters: {},
  persist: {
    // // 修改存储中使用的键名称，默认为当前 Store的 id
    // key: "storekey",
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    paths: ["TOKEN"],
  },
});
export default store;
