import { createRouter, createWebHashHistory } from "vue-router";
import { constRoutes } from "./routes";
const router = createRouter({
  history: createWebHashHistory(),
  routes: constRoutes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    };
  },
});
export default router;
