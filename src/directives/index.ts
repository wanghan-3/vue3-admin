import { useStore } from "@/store";
import type { App } from "vue";
export default {
  install(app: App) {
    const $store = useStore();
    app.directive("btn", {
      mounted(el: any, opt: any) {
        if (!$store.userInfo.buttons.includes(opt.value)) {
          el.parentNode.removeChild(el);
        }
      },
    });
  },
};
