import axios from "axios";
import { useStore } from "@/store";
// import { ElLoading } from "element-plus";
let loading: any = {};
let requestCounnt = 0;
// 1.创建加入配置 并创建axios
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 20000,
});
// 2.请求拦截 cb(config)=>cinfig config网络请求信息对象 包括请求数据请求头请求类型等等
request.interceptors.request.use((config: any) => {
  if (!config.hideLoading) {
    if (!requestCounnt) {
      loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    }
    requestCounnt++;
  }
  // 1.从store中获取 token
  const store = useStore();
  if (store.TOKEN) {
    // 2.将获取到的token带到请求数据中的 header(请求头对象)的 Token 上 本来设计成(Authorization)才对
    config.headers.Token = store.TOKEN;
  }
  return config;
});
const resopnseFn = () => {
  requestCounnt--;
  if (!requestCounnt) {
    // 300毫秒兜底
    setTimeout(() => {
      loading.close();
    }, 300);
  }
};
// 3.响应拦截器 成功回调res=>res res 响应对象包括http状态码 后端响应数据等... err=>{}失败回调， err错误信息
request.interceptors.response.use(
  (res) => {
    resopnseFn();
    if (res.data.code === 200) {
      return res.data;
    } else {
      const code = res.data.code;
      switch (code) {
        case 201:
          ElMessage.error(res.data.data || res.data.message);
          break;
        default:
          break;
      }
      return Promise.reject(res.data.message);
    }
    // 简化信息
  },
  (err) => {
    resopnseFn();
    ElMessage.error(err.message);
    return Promise.reject(err);
  },
);
// 对外暴露 request
export default request;
