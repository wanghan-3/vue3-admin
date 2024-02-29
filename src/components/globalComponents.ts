import * as elIcon from "@element-plus/icons-vue";
import { App } from "vue";
const global = { ...elIcon };
export default {
  install(app: App) {
    for (const key in global) {
      // console.log(key)
      app.component(key, (global as any)[key]);
    }
  },
};
