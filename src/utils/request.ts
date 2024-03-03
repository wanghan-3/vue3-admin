import axios from "axios";
import { useStore } from "@/store";
// 1.创建加入配置 并创建axios
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 20000,
});
// 2.请求拦截 cb(config)=>cinfig config网络请求信息对象 包括请求数据请求头请求类型等等
request.interceptors.request.use((config) => {
  // 1.从store中获取 token
  const store = useStore();
  if (store.TOKEN) {
    // 2.将获取到的token带到请求数据中的 header(请求头对象)的 Token 上 本来设计成(Authorization)才对
    config.headers.Token = store.TOKEN;
  }
  return config;
});
// 3.响应拦截器 成功回调res=>res res 响应对象包括http状态码 后端响应数据等... err=>{}失败回调， err错误信息
request.interceptors.response.use(
  (res) => {
    if (res.data.code === 200) {
      return res.data;
    } else {
      const code = res.data.code;
      switch (code) {
        case 201:
          ElMessage.error(res.data.data);
          break;
        default:
          break;
      }
      return Promise.reject(res.data.message);
    }
    // 简化信息
  },
  (err) => {
    ElMessage.error(err.message);
    return Promise.reject(err);
  },
);
// 对外暴露 request
export default request;
