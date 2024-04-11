import { createApp } from "vue";
import "@/styles/index.scss";
import App from "@/App.vue";
import "virtual:svg-icons-register";
import router from "@/router";
import store, { useStore } from "@/store";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import globalComponents from "@/components/globalComponents";
import "./permission.ts";
import "element-plus/theme-chalk/dark/css-vars.css";
import directives from "@/directives";
store.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(store); // 注册仓库
useStore().filterRoute();
app.use(router);
app.use(globalComponents);
app.use(directives); // 注册自定义指令
app.mount("#app");
