// 路由鉴权-全局路由守卫配置 当项目中任意路由切换都会触发
import router from "@/router";
import nprogress from "nprogress"; // 进度条组件
import "nprogress/nprogress.css"; // 进度条样式

import { useStore } from "@/store";
nprogress.configure({ showSpinner: false });
const whiteList = ["/login", "/404"];
// 全局前置路由守卫 to:要跳转的路由，from:当前路由，next:跳转方法，不传参数为 跳转到 to ， 或者自己传递参数
router.beforeEach((to, from, next) => {
  const $store = useStore();
  nprogress.start();
  if ($store.TOKEN) {
    // 有token情况
    // 要跳转的路由为 login 但 token 存在 即非法跳转。
    if (to.path === "login") {
      next("/");
    } else {
      next();
    }
  } else {
    // 无token情况
    if (whiteList.includes(to.path)) {
      // 在白名单内-通过
      next();
    } else {
      // 非白名单跳转并传递重定向参数
      next({
        path: "/login",
        query: { redirect: to.path },
      });
    }
  }
});

// 全局后置路由守卫
router.afterEach((to) => {
  const docTitle =
    to.path !== "/home"
      ? import.meta.env.VITE_APP_TAG_TITLE + " | " + to.meta.title
      : import.meta.env.VITE_APP_TAG_TITLE;
  document.title = docTitle;
  nprogress.done();
});
