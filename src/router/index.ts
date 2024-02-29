import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    };
  },
});
export default router;
